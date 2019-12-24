import io from 'socket.io-client';
import { saveMap } from './map.js';
import { Player } from '../entity/player.js';
import {
    setNewPlayer,
    getNewPlayer,
    getContext,
    addLoot,
    addMob,
    player2ShootAt,
    damageEntity,
    manageDeadMob,
    playerPickUpLoot,
    getLocalPlayer,
    getDoor,
} from '../game.js';
import { displayMessage, displayNewUser, displayUserDisconnected } from './chat.js';

const socket = io.connect('http://localhost:8080');


export const initSocksEvents = () => {
    sendMessage('playerlist');
    socket.on('getid', (data) => {        
        getLocalPlayer().socketId = data.id;
    });
   
    socket.on('map', map => {
        saveMap(map);
    });

    socket.on('updatechat', (data) => {
        displayMessage(data);
    });

    socket.on('newplayer', player => {
        setNewPlayer(new Player(player.name, player.x, player.y, player.socketId, getContext()));
        displayNewUser(player.name);
    });

    socket.on('playerlist', list => {
        if (list.length > 0) {
            setNewPlayer(new Player(list[0].name, list[0].x, list[0].y, list[0].socketId, getContext(), list[0].skinId));
        }
    });

    socket.on('playermove', direction => {
        const player = getNewPlayer();
        if (direction == "z") {
            player.dy = -player.speed;
            player.frameY = player.AVANCER;
        } else if (direction == "s") {
            player.dy = player.speed;
            player.frameY = player.RECULER;
        } else if (direction == "q") {
            player.dx = -player.speed;
            player.frameY = player.GAUCHE;
        } else if (direction == "d") {
            player.dx = player.speed;
            player.frameY = player.DROIT;
        } else if (direction == "ny") {
            player.dy = 0;
        } else if (direction == "nx") {
            player.dx = 0;
        }
    });

    socket.on('playerpos', pos => {
        const player = getNewPlayer();
        if (player) {
            player.x = pos.x;
            player.y = pos.y;
            player.healthBar.x = pos.x;
            player.healthBar.y = pos.y;
            player.shieldBar.x = pos.x;
            player.shieldBar.y = pos.y;
        }
    });

    socket.on('mobs', data => {
        data.forEach(e => {
            addMob(e.mobType, e.position, e.target, e.id);
        });
    });

    socket.on('loots', loot => {
        addLoot(loot.type, loot.position, loot.id);
    });

    socket.on('deadmob', id => {
        manageDeadMob(id);
    });

    socket.on('playershoot', targetId => {     
        player2ShootAt(targetId);
    });

    socket.on('hitentity', data => {                
        damageEntity(data.id, data.type, data.sender);
    });

    socket.on('lootpickup', data => {                      
        playerPickUpLoot(data.lootId, data.picker);
    });

    socket.on('playerhs', data => {
        const player = getNewPlayer();
        if (player) {
            player.health = data.health; 
            player.shield = data.shield;
        }
    });

    socket.on('levelfinished', data => {
        getDoor().open();
    });

    socket.on('reposplayer', data => {
        const player = getLocalPlayer();
        if(data.socketId === socket.id && player) {           
            getDoor().close();
            player.x = data.x;
            player.y = data.y;
            player.healthBar.x = data.x;
            player.healthBar.y = data.y;
            player.shieldBar.x = data.x;
            player.shieldBar.y = data.y;
       }
    });
  

    socket.on('playerdisconnected', player => {
        if(player)
            displayUserDisconnected(player.name);
        setNewPlayer(undefined);
    });
}

export const sendMessage = (event, msg) => {
    socket.emit(event, msg);
}