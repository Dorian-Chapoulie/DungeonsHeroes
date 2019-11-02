const socket = io.connect();
import { saveMap } from '/js/map.js';
import { Player } from '/js/player.js';
import { setNewPlayer, getNewPlayer } from '/js/game.js';
import { displayMessage, displayNewUser } from '/js/chat.js';

export const initSocksEvents = () => {
    sendMessage('playerlist');

    socket.on('map', map => {                               
        saveMap(map);
    });

    socket.on('updatechat', (data) => {           
        displayMessage(data);
    }); 
    
    socket.on('newplayer', player => {                                             
        setNewPlayer(new Player(player.name, player.x, player.y));
        displayNewUser(player.name);
    });  

    socket.on('playerlist', list =>  {                 
        if(list.length > 0) {
            setNewPlayer(new Player(list[0].name, list[0].x, list[0].y));;
        }
    });

    socket.on('playermove', direction => {   
        const player = getNewPlayer();                                        
        if(direction == "z") {            
            player.dy = - player.speed;
            player.frameY = player.AVANCER;            
        }else if(direction == "s") {
            player.dy = player.speed;
            player.frameY = player.RECULER;            
        }else if(direction == "q") {
            player.dx = - player.speed;
            player.frameY = player.GAUCHE;            
        }
        else if(direction == "d") {
            player.dx = player.speed;
            player.frameY = player.DROIT;            
        }else if(direction == "ny") {
            player.dy = 0;           
        }else if(direction == "nx") {
            player.dx = 0;               
        }                
    });  
}

export const sendMessage = (event, msg) => {
    socket.emit(event, msg);
}


