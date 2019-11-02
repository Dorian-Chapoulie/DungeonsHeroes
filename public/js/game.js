import { initSocksEvents, sendMessage } from '/js/socketsHandler.js';
import { initInputsEvent, isKeyPressed, cansendNx, cansendNy } from '/js/inputsHandler.js';
import { drawPlayerAnimation, drawMap } from '/js/graphics.js';
import { initChat } from '/js/chat.js';
import { mapLevel, tilesSize } from '/js/map.js';
import { Player } from '/js/player.js';

var player, player2;
var canvas;
var context;    

var canSendNx = false;
var canSendNy = false;

document.addEventListener("DOMContentLoaded", () => init());

export const setNewPlayer = (newPlayer) => {
    player2 = newPlayer;
}

export const getNewPlayer = () => player2;
export const getLocalPlayer = () => player;

const init = () => { 
    initSocksEvents();   
    initInputsEvent();
    initChat();
    
    const pseudo = prompt("votre pseudo:");
    player = new Player(pseudo, 300, 300);

    sendMessage('newplayer', {name: pseudo, x: player.x, y: player.y});

    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');    
           
    drawMap(context, mapLevel, tilesSize); 
    requestAnimationFrame(loop);

    setInterval(() => {
        sendMessage('playerpos', {x: player.x, y: player.y});  
    }, 2 * 1000);
}

const playerMovements = () => {
    
    if(isKeyPressed("z")) {
        player.dy = - player.speed;
        player.frameY = player.AVANCER;               
        sendMessage('playermove', {pos: 'z', name: player.name});      
        canSendNy = true;                
    }else if(isKeyPressed("s")) {
        player.dy = player.speed;
        player.frameY = player.RECULER;
        sendMessage('playermove', {pos: 's', name: player.name});        
        canSendNy = true;
    }else if(cansendNy() && canSendNy) {
        player.dy = 0;
        sendMessage('playermove', {pos: 'ny', name: player.name});    
        canSendNy = false;               
    }

    if(isKeyPressed("q")) {
        player.dx = - player.speed;
        player.frameY = player.GAUCHE;
        sendMessage('playermove', {pos: 'q', name: player.name});  
        canSendNx = true;      
    }else if(isKeyPressed("d")) {
        player.dx = player.speed;
        player.frameY = player.DROIT;
        sendMessage('playermove', {pos: 'd', name: player.name});        
        canSendNx = true;      
    }else if(cansendNx() && canSendNx) {
        player.dx = 0;    
        sendMessage('playermove', {pos: 'nx', name: player.name});    
        canSendNx = false;              
    }
}

const loop = () => {    
    //context.clearRect(0, 0, canvas.width, canvas.height);
    const startDate = new Date();
    drawMap(context, mapLevel, tilesSize);      
    
    drawPlayerAnimation(context, player);

    
    playerMovements();
        
    player.draw(context);
            
    if(player2) {                           
        player2.draw(context);
        drawPlayerAnimation(context, player2);
    }

    const endDate = new Date();
    const delta = (endDate.getTime() - startDate.getTime()) + 1;

    if(player2)
        player2.move(delta);
    player.move(delta);
    
    requestAnimationFrame(loop);
}