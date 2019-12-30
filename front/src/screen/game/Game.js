import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from 'reactstrap';
import { init, player as gamePlayer, stopLoop, player2 } from '../../game/game';
import {
  isConnected,
  initSocksEvents,
  connect as connectToServer,
  isInitialized,
  socket,
} from '../../game/network/socketsHandler';
import { initInputsEvent, isInitialized as isInitializedInputs } from '../../game/inputs/inputsHandler';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props); 
    const { isSpritesLoaded  } = this.props;    
    
    if(isSpritesLoaded) {        
      connectToServer();

      initSocksEvents();

      initInputsEvent();

      this.state = {
        showCanvas: true,
        canRedirect: false,
        player: undefined,
        redirectNoLoaded: false,
      } 
    }else {
      this.state = {
        showCanvas: false,
        canRedirect: false,
        redirectNoLoaded: true,
        player: undefined,
      } 
    }

       
  }

  componentDidMount() {
    const { redirectNoLoaded } = this.state;
    const { pseudo, skinId } = this.props;

    if(!redirectNoLoaded) {     
     
      init(pseudo, skinId);    
      
      const interval = setInterval(() => {
        if(!isConnected){
          this.setState({player: gamePlayer});
          this.setState({showCanvas: false});                         
          clearInterval(interval);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    stopLoop();
    try {
      socket.disconnect();
    }catch(e) {
      console.log(e);
    }
  }

  handleClickOk = () => {
    this.setState({canRedirect: true});    
  }

  render() {  
    const { showCanvas, canRedirect, player, redirectNoLoaded } = this.state; 
    if(!player && !showCanvas) {
      this.setState({canRedirect: true})
    }         
    return (
      <>  
        { canRedirect && <Redirect to='/main'/>}
        { redirectNoLoaded && <Redirect to='/main'/>}
        { showCanvas && 
          <canvas className="GameCanvas" id="Canvas" height="896" width="640"></canvas>
        }
        { !showCanvas && !redirectNoLoaded && player &&
          <Card className="login mt-5" style={{width: '18em'}}>    
            <CardHeader>
                <h5>{player.name} - Statistiques</h5>
            </CardHeader>

            <CardBody>
                <p>Argent: {player.coin}</p>                
            </CardBody>     

            <CardFooter>
              <Button color="success"  onClick={this.handleClickOk}>Retourner au menu</Button>
            </CardFooter>
          </Card>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {    
    pseudo: state.player.pseudo,
    skinId: state.player.skinId,
    isSpritesLoaded: state.player.isSpriteLoaded,
  }
}


export default connect(mapStateToProps)(Game);