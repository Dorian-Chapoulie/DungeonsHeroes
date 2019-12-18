import React from 'react';
import { init } from '../../game/game'
import './Game.scss';

class Game extends React.Component {
  constructor() {
    super();
    setTimeout(() => init(), 1000);
  }

  render() {            
    return (
      <>  
          <canvas className="GameCanvas" id="Canvas" height="896" width="640"></canvas>
      </>
    );
  }
}

export default Game;
