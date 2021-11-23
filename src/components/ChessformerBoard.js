import "./ChessformerBoard.css"
import { useState } from 'react';
import axios from "axios";
import Chess from 'chess.js';
import { Chessboard } from 'react-chessboard';
import Constants from "../constants";

export default function ChessformerBoard() {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  async function makeEngineMove(moves) {
    if (game.game_over() || game.in_draw()) return; // exit if the game is over

    let response;
    let url = Constants.backend_url + "/predict";
    let parsedMoves = moves.replace(new RegExp(/\d+\. /, 'g'), "")
    console.log(parsedMoves);

    await axios.post(url, { 'input_moves': parsedMoves },)
      .then(res => {
        response = res.data.moves
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.response)
        response = {
          success: false,
          object: error.response && error.response.data,
        }
      });

    safeGameMutate((game) => {
      let move = game.load_pgn(response);
      console.log(move);
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    let move = null;

    safeGameMutate((game) => {
      move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // always promote to a queen for example simplicity
      });
    });

    if (move === null) return false; // illegal move

    makeEngineMove(game.pgn());

    return true;
  }

  function undoLastMove() {
    safeGameMutate((game) => {
      game.undo();
      game.undo();
    });
  }

  function resetBoard() {
    safeGameMutate((game) => {
      game.reset();
    });
  }

  return (
    <div className="board-panel">
      <div>
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>
      <div className="board-information">
        <div className="board-moves">
          <p>{game.pgn()}</p>
        </div>
        <div className="mt-8">
          <button className="button button-warning mh-8" onClick={undoLastMove}>Undo</button>
          <button className="button button-warning mh-8" onClick={resetBoard}>Reset</button>
        </div>
      </div>
    </div>
  );
}