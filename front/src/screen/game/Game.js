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
import { init, player as gamePlayer, stopLoop } from '../../game/game';
import {
  isConnected,
  initSocksEvents,
  connect as connectToServer,
  isInitialized,
} from '../../game/network/socketsHandler';
import { initInputsEvent, isInitialized as isInitializedInputs } from '../../game/inputs/inputsHandler';
import './Game.scss';

class Game extends React.Component {
  constructor(props) {
    super(props); 

    connectToServer();

   //if(!isInitialized)
      initSocksEvents();

    //if(!isInitializedInputs)
      initInputsEvent();

    this.state = {
      showCanvas: true,
      canRedirect: false,
      player: undefined,
    }    
  }

  componentDidMount() {
    const { pseudo, skinId } = this.props;
    init(pseudo, skinId);   
    const interval = setInterval(() => {
      if(!isConnected){
        this.setState({player: gamePlayer});
        this.setState({showCanvas: false});        
        stopLoop();         
        clearInterval(interval);
      }
    }, 500);
  }

  handleClickOk = () => {
    this.setState({canRedirect: true});    
  }

  render() {  
    const { showCanvas, canRedirect, player } = this.state;          
    return (
      <>  
        { canRedirect && <Redirect to='/main'/>}
        { showCanvas && 
          <canvas className="GameCanvas" id="Canvas" height="896" width="640"></canvas>
        }
        { !showCanvas &&
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
  }
}


export default connect(mapStateToProps)(Game);