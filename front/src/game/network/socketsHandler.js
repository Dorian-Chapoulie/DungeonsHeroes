import io from 'socket.io-client';
import { saveMap } from './map.js';
import { Player } from '../entity/player.js';
import { sounds, soundsIds } from '../graphics/assets';

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
    damageTorch,
    respawnPlayer,
    stopLoop,
} from '../game.js';
import { displayMessage, displayNewUser, displayUserDisconnected } from './chat.js';

export var socket;

export const connect = () => { 
    socket = io.connect('http://localhost:8080');
    isConnected = true;        
}
export var isConnected = true;
export var isInitialized = false;

export const initSocksEvents = () => {
    isInitialized = true;
    sendMessage('playerlist');
    socket.on('getid', (data) => {       
        const interval = setInterval(() => {
            if(getLocalPlayer()) {
                getLocalPlayer().socketId = data.id;
                clearInterval(interval);
            }            
        }, 200);         
    });
   
    socket.on('map', map => {
        saveMap(map);
    });

    socket.on('updatechat', (data) => {
        displayMessage(data);
    });

    socket.on('newplayer', player => {        
        setNewPlayer(new Player(player.name, player.x, player.y, player.socketId, getContext(), player.skinId));
        displayNewUser(player.name);
    });

    socket.on('playerlist', list => {
        if (list.length > 0) {
            setNewPlayer(new Player(list[0].name, list[0].x, list[0].y, list[0].socketId, getContext(), list[0].skinId));
        }
    });

    socket.on('playermove', direction => {
        const player = getNewPlayer();
        if(player) {
            if (direction == "z") {
                player.frameY = player.AVANCER;
            } else if (direction == "s") {
                player.frameY = player.RECULER;
            } else if (direction == "q") {
                player.frameY = player.GAUCHE;
            } else if (direction == "d") {
                player.frameY = player.DROIT;
            }
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

    socket.on('touchtorch', data => {
        damageTorch(data.health, data.id);
    });

    socket.on('respawnplayer', data => { 
        respawnPlayer(data); 
        sounds[soundsIds.respawn].play();
    });  
  
    socket.on('playerdisconnected', player => {
        if(player)
            displayUserDisconnected(player.name);
        setNewPlayer(undefined);
    });
    
    socket.on('disconnect', () => {
        isConnected = false;
        stopLoop();
    });    
}

export const sendMessage = (event, msg) => {
    socket.emit(event, msg);
}