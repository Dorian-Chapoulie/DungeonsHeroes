import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addCoin } from '../../lib/fetch';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { addMoneyAction } from '../../actions/player';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from 'reactstrap';
import { init, player as gamePlayer, stopLoop, player2 } from '../../game/game';
import {
  isConnected,
  initSocksEvents,
  connect as connectToServer,  
  socket,
  sendMessage,
} from '../../game/network/socketsHandler';
import { initInputsEvent, isInitialized as isInitializedInputs } from '../../game/inputs/inputsHandler';
import { sounds, soundsIds } from '../../game/graphics/assets';
import './Game.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';

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
        msg: '',
      } 
    }else {
      this.state = {
        showCanvas: false,
        canRedirect: false,
        redirectNoLoaded: true,
        player: undefined,
        msg: '',
      } 
    }

       
  }

  componentDidMount() {
    const { redirectNoLoaded } = this.state;
    const { pseudo, skinId } = this.props;

    if(!redirectNoLoaded) {     
     
      init(pseudo, skinId);    
      
      var tempPlayer = undefined;
      const interval = setInterval(() => {
        if(gamePlayer)
          tempPlayer = gamePlayer;
        if(!isConnected){
          this.setState({player: tempPlayer});
          this.setState({showCanvas: false});
          clearInterval(interval);
        }
      }, 500);
    }
  }

  componentWillUnmount() {
    stopLoop();
    sounds.forEach(s => {           
        s.pause();
        s.currentTime = 0;
    })
    try {
      socket.disconnect();
    }catch(e) {
      console.log(e);
    }
  }

  handleClickOk = () => {
    sounds.forEach(s => {
      if(s === sounds[soundsIds.theme] || s === sounds[soundsIds.bossSound])  {            
          s.pause();
          s.currentTime = 0;
      }
    })

    const { player } = this.state;
    const { email, isGuest, addMoney } = this.props;
    if(!isGuest && player) {
      addCoin(email, player.coin);
      addMoney(player.coin);
    }
    this.setState({canRedirect: true});    
  }

  handleClickSend = () => {
    const { msg } = this.state;
    if(msg.length > 0)
      sendMessage('sendchat', {msg, name: gamePlayer.name});
    this.setState({msg: ''});
  }

  handleChange(event) {
    this.setState({msg: event.target.value});
  }

  render() {  
    const { showCanvas, canRedirect, player, redirectNoLoaded, msg } = this.state; 
    if(!player && !showCanvas) {
      this.setState({canRedirect: true})
    }     
       
    return (
      <>  
        { canRedirect && <Redirect to='/main'/>}
        { redirectNoLoaded && <Redirect to='/main'/>}
        { showCanvas &&
          <div>
            <canvas className="GameCanvas" id="Canvas" height="896" width="640"></canvas>
            <div className="chatbox">  
              <PerfectScrollbar className="scroll">
                <div id="conversation"/>
              </PerfectScrollbar>
              <Input type="text" style={{width: '10em'}} name="text" value={msg} onChange={e => this.handleChange(e)}/>
              <Button color="success" onClick={this.handleClickSend}>Envoyer</Button>
            </div>
          </div> 
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
    email: state.player.email,
    skinId: state.player.skinId,
    isSpritesLoaded: state.player.isSpriteLoaded,
    isGuest: state.player.isGuest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMoney: (money) => dispatch(addMoneyAction(money)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game);