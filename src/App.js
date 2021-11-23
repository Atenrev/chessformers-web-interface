import './App.css';
import { Navbar } from './components/Navbar';
import ChessformerBoard from './components/ChessformerBoard';


// Design reference: https://atomizecode.com/
function App() {
  return (
    <div className="App">
      <Navbar />
      <main>
        <section>
          <div className="centered-column">
            <div className="container">
              <h2>Play against the engine</h2>
              <ChessformerBoard />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
