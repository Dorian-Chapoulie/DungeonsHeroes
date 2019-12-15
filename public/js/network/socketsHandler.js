const socket = io.connect();
import { saveMap } from '/js/network/map.js';
import { Player } from '/js/entity/player.js';
import {
    setNewPlayer,
    getNewPlayer,
    getContext,
    addLoot,
    player2ShootAt,
    damageEntity,
    manageDeadMob,
    playerPickUpLoot,
    getLocalPlayer,
    getDoor,
    respawnPlayer,
} from '/js/game.js';
import { displayMessage, displayNewUser, displayUserDisconnected } from '/js/network/chat.js';
import { addMob } from '/js/game.js';

//var peer;
//var localMediaStream;

const askPermissions = (elementId) => {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    var constraints = { audio: true };

    navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
        localMediaStream = mediaStream;
        var video = document.getElementById(elementId);
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
            //video.play();
        };
    }).catch(function(err) { console.log(err.name + ": " + err.message); });
}

export const initSocksEvents = () => {
    sendMessage('playerlist');
    socket.on('connect', () => {
        getLocalPlayer().socketId = socket.id;
    });
    /*
    socket.on('connect', () => {
        peer = new Peer(socket.id);

        console.log("Mon id: ", peer.id);

        peer.on('call', function(call) {
           
            askPermissions('video');

            console.log("JE REPOND AU CALL");            

            call.on('stream', function(inStream) {
                var videoPartner = document.getElementById('video2');
                videoPartner.srcObject = inStream;
                videoPartner.onloadedmetadata = function(e) {
                    videoPartner.play();
                };
            });

            call.answer(localMediaStream);
        });
    });*/

    socket.on('map', map => {
        saveMap(map);
    });

    socket.on('updatechat', data => {
        displayMessage(data);
    });

    socket.on('respawnplayer', data => {
        respawnPlayer(data);
    });


    socket.on('newplayer', player => {
        setNewPlayer(new Player(player.name, player.x, player.y, player.socketId, getContext()));

        /*askPermissions('video');

        const createEmptyAudioTrack = () => {
            const ctx = new AudioContext();
            const oscillator = ctx.createOscillator();
            const dst = oscillator.connect(ctx.createMediaStreamDestination());
            oscillator.start();
            const track = dst.stream.getAudioTracks()[0];
            return Object.assign(track, { enabled: false });
          };
        const audioTrack = createEmptyAudioTrack();
        const mediaStream = new MediaStream([audioTrack]);
          
        console.log("JE CALL: ", player.socketId);
        var call = peer.call(player.socketId, mediaStream);  
        //
        call.on('stream', function(stream) {
            var videoPartner = document.getElementById('video2');
            videoPartner.srcObject = stream;
            videoPartner.onloadedmetadata = function(e) {
                videoPartner.play();
            };
        });*/

        displayNewUser(player.name);
    });

    socket.on('playerlist', list => {
        if (list.length > 0) {
            setNewPlayer(new Player(list[0].name, list[0].x, list[0].y, list[0].socketId, getContext()));
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
       if(data.socketId === socket.id && getLocalPlayer()) {           
            getDoor().close();
            const player = getLocalPlayer();
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