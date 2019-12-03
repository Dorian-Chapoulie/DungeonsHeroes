import { initSocksEvents, sendMessage } from '/js/network/socketsHandler.js';
import { initInputsEvent, isKeyPressed, cansendNx, cansendNy } from '/js/inputs/inputsHandler.js';
import { drawEntityAnimation, drawMap } from '/js/graphics/graphics.js';
import { initChat } from '/js/network/chat.js';
import { mapLevel, tilesSize } from '/js/network/map.js';
import { Player } from '/js/entity/player.js';
import { Skeleton } from '/js/entity/skeleton.js';
import { Wizzard } from '/js/entity/wizzard.js';
import { Witch } from '/js/entity/witch.js';
import { Torch } from '/js/entity/torch.js';
import { Coin } from '/js/loot/coin.js';
import { Heart } from '/js/loot/heart.js';
import { Armor } from '/js/loot/armor.js';
import { Fire } from '/js/projectiles/Fire.js';
import { Frost } from '/js/projectiles/Frost.js';
import { Poison } from '/js/projectiles/Poison.js';

var player, player2;
var mobs = [];
var loots = [];
var lights = [];
var canvas;
var context;
var canSendNx = false;
var canSendNy = false;
var themeSong = document.getElementById('theme');
var isSoungPlayed = false;

document.addEventListener("DOMContentLoaded", () => init());

export const setNewPlayer = (newPlayer) => {
    player2 = newPlayer;
}
export const getContext = () => context;
export const getNewPlayer = () => player2;
export const getLocalPlayer = () => player;
export const player2ShootAt = entityId => {
    mobs.forEach(m => {
        if(m.id === entityId) {
            player2.target = m;            
        }
    });
}
export const damageEntity = (entityId, type) => {    
    let target = undefined;
    let projectile = undefined;

    mobs.forEach(m => {
        if(m.id === entityId) {
            target = m;
        }
    })
    if(player.name == entityId) {
        target = player;
    }
    if(player2.name == entityId) {
        target = player2;
    }

    if(target) {
        switch(type){
            case 0: //fire
                projectile = new Fire(context, 0, 0);
                break;
            case 1: //frost
                projectile = new Frost(context, 0, 0);
                break;
            case 2: //poison
                projectile = new Poison(context, 0, 0);
                break;
        }
        projectile.onHit(target);
    }else {
        console.log(target, "pas trouvé");
        mobs.forEach(m => console.log(m.id));
    }
}

export const playerPickUpLoot = (lootId, playername) => {    
    if(player.name === playername) {
        for(let i = 0; i < loots.length; i++) {
            if(loots[i] && loots[i].id === lootId) {                
                loots[i].onPickUp(player);
                loots[i] = undefined;
                break;
            }
        }
    }else if(player2.name === playername) {
        for(let i = 0; i < loots.length; i++) {
            if(loots[i] && loots[i].id === lootId) {            
                loots[i].onPickUp(player2);
                loots[i] = undefined;
                break;
            }
        }
    }
}

export const manageDeadMob = (mobId) => {
    if(player.target.id === mobId) {
        player.target = undefined;
    }    
    if(player2.target.id === mobId) {
        player2.target = undefined;
    }    
    mobs = mobs.filter(m => m.id !== mobId);
}
export const addMob = (mobType, pos, targetId, id) => {
    const target = targetId === player2.socketId ? player2 : player;
    switch (mobType) {
        case 0:
            mobs.push(new Skeleton(pos.x, pos.y, target, context, id));
            break;
        case 1:
            mobs.push(new Wizzard(pos.x, pos.y, target, context, id));
            break;
        case 2:
            mobs.push(new Witch(pos.x, pos.y, target, context, id));
            break;
    }
}

export const addLoot = (type, pos, id) => {
    switch (type) {
        case 0: //coin
            loots.push(new Coin(context, pos.x, pos.y, id));
            break;
        case 1: //heart
            loots.push(new Heart(context, pos.x, pos.y, id));
            break;
        case 2: //armor
            loots.push(new Armor(context, pos.x, pos.y, id));
            break;
    }
}

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

/*
function playSound(url){
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function(){
      audio.remove() //Remove when played.
    };
    document.body.appendChild(audio);
}*/

const init = () => {
    initSocksEvents();
    initInputsEvent();
    initChat();

    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');

    /*
    for(let x = 1; x < 4; x+=2) {
        for(let y = 0; y < 8; y++) {
            lights.push(new Torch(x * 100 + 100, y + 64 + y * 100, context));    
        }        
    }*/

    const pseudo = prompt("votre pseudo:");
    player = new Player(pseudo, 300, 800, undefined, context); 

   /* const intervalSong = setInterval(() => {        
        if(isSoungPlayed) {
            clearInterval(intervalSong);
        }
        themeSong.play().then(() => isSoungPlayed = true).catch(() => isSoungPlayed = false);
    }, 100);  */  


    sendMessage('newplayer', { name: pseudo, x: player.x, y: player.y });    

    drawMap(context, mapLevel, tilesSize);
    requestAnimationFrame(loop);

    setInterval(() => {
        sendMessage('playerpos', { x: player.x, y: player.y });
    }, 2 * 1000);
}

const playerMovements = () => {

    /* Collision Murs */
    if (player.x + player.width + 16 > canvas.width) {
        player.dx = 0;
        player.canMoveRight = false;
    } else {
        player.canMoveRight = true;
    }

    if (player.x < 16) {
        player.dx = 0;
        player.canMoveLeft = false;
    } else {
        player.canMoveLeft = true;
    }

    if (player.y + player.height > canvas.height - 32) {
        player.dy = 0;
        player.canMoveDown = false;
    } else {
        player.canMoveDown = true;
    }

    if (player.y < 32) {
        player.dy = 0;
        player.canMoveUp = false;
    } else {
        player.canMoveUp = true;
    }

    if (isKeyPressed("z") && player.canMoveUp) {
        player.dy = -player.speed;
        player.frameY = player.AVANCER;
        sendMessage('playermove', 'z');
        canSendNy = true;
    } else if (isKeyPressed("s") && player.canMoveDown) {
        player.dy = player.speed;
        player.frameY = player.RECULER;
        sendMessage('playermove', 's');
        canSendNy = true;
    } else if (cansendNy() && canSendNy) {
        player.dy = 0;
        sendMessage('playermove', 'ny');
        canSendNy = false;
    }

    if (isKeyPressed("q") && player.canMoveLeft) {
        player.dx = -player.speed;
        player.frameY = player.GAUCHE;
        sendMessage('playermove', 'q');
        canSendNx = true;
    } else if (isKeyPressed("d") && player.canMoveRight) {
        player.dx = player.speed;
        player.frameY = player.DROIT;
        sendMessage('playermove', 'd');
        canSendNx = true;
    } else if (cansendNx() && canSendNx) {
        player.dx = 0;
        sendMessage('playermove', 'nx');
        canSendNx = false;
    }
}

const randomMobsMovements = (m) => {
    if (m.x + m.width > canvas.width) {
        m.dx = -m.speed;
    }
    if (m.x <= 0) {
        m.dx = m.speed;
    }

    if (m.y + m.width > canvas.height) {
        m.dy = -m.speed;
    }

    if (m.y < 0) {
        m.dy = m.speed;
    }
}

const entityCollision = (a, b) => {
    if (a.x >= b.x && a.x <= b.x + b.width) {
        if(a.y >= b.y && a.y <= b.y + b.height) {
            return true;
        }
    }
    return false;
}

/*
const projectileCollision = (projectile, entity) => {
    if (entityCollision(projectile, entity)) {
        entity.damage(projectile.damageValue);
        entity.draw(context);
        return true;
    }
    return false;
}*/

const destroyProjectile = projectile => {
    if (projectile.x >= canvas.width - 32 ||
        projectile.x <= 32 ||
        projectile.y >= canvas.height - 32 ||
        projectile.y <= 32) {
        return true;
    }
    return false;
}

const loop = () => {
    const startDate = new Date();
    drawMap(context, mapLevel, tilesSize);    

    drawEntityAnimation(player);
    /*lights.forEach(l => {
        if(l.y >= player.y && l.canProcessLight == false) {
            l.canProcessLight = true;
            playSound('/media/sound/torch.mp3');
        }
        l.processLight();
        drawEntityAnimation(l);
    });*/

    playerMovements();

    player.draw();

    const deadMobs = mobs.filter(m => m.health <= 0);
    deadMobs.forEach(dm => {
        if(player.target === dm) {
            player.target = undefined;
        }
        if(player2.target === dm) {
            player2.target = undefined;
        }     
        sendMessage('deadmob', {name: dm.name, position: {x: dm.x, y: dm.y}, id: dm.id });
    });
    
    if(loots.length > 0) {   
        loots = loots.filter(l => l !== undefined);     
        for(let i = 0; i < loots.length; i++) {
            drawEntityAnimation(loots[i]);
            if(entityCollision(loots[i], player)) {                 
                sendMessage('lootpickup', {lootId: loots[i].id, picker: player.name});             
            }
        };                
    }
    mobs = mobs.filter(m => m.health > 0);

    if(!player.target) {
        player.target = mobs[getRandomInt(mobs.length)];
    }else {
        sendMessage('playershoot', player.target.id);
        player.shoot();
    }      

    mobs.forEach(m => {
        drawEntityAnimation(m);
        m.draw();
        m.shoot();

        if (player.projectile && entityCollision(player.projectile, m)) {
            player.canShoot = true;
            sendMessage('hitentity', {id: m.id, type: player.projectile.type, shootId: player.shootId, sender: player.name});
            player.projectile = undefined;
        }
        
        if (player2 && player2.projectile && entityCollision(player2.projectile, m)) {            
            player2.canShoot = true;
            sendMessage('hitentity', {id: m.id, type: player2.projectile.type, shootId: player2.shootId, sender: player2.name});
            player2.projectile = undefined;
        }

        if (m.projectile !== undefined) {
            m.projectile.move();
            if (entityCollision(m.projectile, player)) {
                m.canShoot = true;                
                sendMessage('hitentity', {id: player.name, type: m.projectile.type, shootId: m.shootId, sender: m.id});
            }

            if (player2 && entityCollision(m.projectile, player2)) {
                m.canShoot = true;                
                sendMessage('hitentity', {id: player2.name, type: m.projectile.type, shootId: m.shootId, sender: m.id});
            }

            if (destroyProjectile(m.projectile)) {
                m.canShoot = true;
                m.projectile = undefined;
            }
        }
        //randomMobsMovements(m);        
    })


    if (player2) {
        player2.draw();
        drawEntityAnimation(player2);

        if(player2 && player2.projectile && destroyProjectile(player2.projectile)) {
            player2.projectile = undefined;
            player2.canShoot = true;
        }

        if(player2.target) {
            player2.shoot();
        }
    }

    const endDate = new Date();
    const delta = (endDate.getTime() - startDate.getTime()) + 1;

    if (player2)
        player2.move(delta);

    player.move(delta);
    if(player.projectile && destroyProjectile(player.projectile)) {
        player.projectile = undefined;
        player.canShoot = true;
    }    
    

    mobs.forEach(m => {
        m.move(delta);
    })

    requestAnimationFrame(loop);    
}