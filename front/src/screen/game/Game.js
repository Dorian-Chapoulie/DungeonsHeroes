import React from 'react';
import { connect } from 'react-redux';
import { init } from '../../game/game';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props);  
  }

  componentDidMount() {
    const { pseudo, skinId } = this.props;    
    init(pseudo, skinId);   
  }

  render() {            
    return (
      <>  
          <canvas className="GameCanvas" id="Canvas" height="896" width="640"></canvas>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {    
    pseudo: state.player.pseudo,
    skinId: state.player.skinId,
  }
}


export default connect(mapStateToProps)(Game);