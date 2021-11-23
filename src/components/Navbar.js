// @flow 
import * as React from 'react';
import "./Navbar.css"

export const Navbar = () => {
  return (
    <nav>
      <div>
        <div className="logo">
          <a href="/">chessformers</a>
        </div>
        <div className="nav-navigation">
          <a href="https://github.com/Atenrev/chessformers">Paper (coming soon)</a>
          <a className="button" href="https://github.com/Atenrev/chessformers">GitHub</a>
        </div>
      </div>
    </nav>
  );
};