import { initSocksEvents, sendMessage } from '/js/network/socketsHandler.js';
import { initInputsEvent, isKeyPressed, cansendNx, cansendNy } from '/js/inputs/inputsHandler.js';
import { drawEntityAnimation, drawMap } from '/js/graphics/graphics.js';
import { initChat } from '/js/network/chat.js';
import { mapLevel, tilesSize } from '/js/network/map.js';
import { Player } from '/js/entity/player.js';
import { Skeleton } from '/js/entity/skeleton.js';
import { Wizzard } from '/js/entity/wizzard.js';
import { Witch } from '/js/entity/witch.js';

var player, player2;
var mobs = [];
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

export const getNewPlayer = () => player2;
export const getLocalPlayer = () => player;

export const addMob = (id, pos, targetId) => {
    const target = targetId === player2.socketId ? player2 : player;
    switch (id) {
        case 0:
            mobs.push(new Skeleton("skeleton", pos.x, pos.y, target));
            break;
        case 1:
            mobs.push(new Wizzard("wizzard", pos.x, pos.y, target));
            break;
        case 2:
            mobs.push(new Witch("witch", pos.x, pos.y, target));
            break;
    }
}

const init = () => {
    initSocksEvents();
    initInputsEvent();
    initChat();

    const pseudo = prompt("votre pseudo:");
    player = new Player(pseudo, 300, 300, undefined); 

    const intervalSong = setInterval(() => {        
        if(isSoungPlayed) {
            clearInterval(intervalSong);
        }
        themeSong.play().then(() => isSoungPlayed = true).catch(() => isSoungPlayed = false);
    }, 100);    


    sendMessage('newplayer', { name: pseudo, x: player.x, y: player.y });

    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');

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

const projectileCollision = (projectile, entity) => {
    if (projectile.x >= entity.x + entity.width / 3 && projectile.x <= entity.x + entity.width - (entity.width / 3)) {
        if (projectile.y >= entity.y && projectile.y <= entity.y + entity.height / 2) {
            entity.damage(projectile.damageValue);
            entity.draw(context);
            return true;
        }
    }

    return false;
}

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
    //context.clearRect(0, 0, canvas.width, canvas.height);
    const startDate = new Date();
    drawMap(context, mapLevel, tilesSize);

    drawEntityAnimation(context, player);

    playerMovements();

    player.draw(context);

    mobs = mobs.filter(m => m.health > 0);

    mobs.forEach(m => {
        drawEntityAnimation(context, m);
        m.draw(context);
        m.shoot(context);
        if (m.projectile !== undefined) {
            m.projectile.move();
            if (projectileCollision(m.projectile, player)) {
                m.canShoot = true;
                m.projectile.onHit(player);
            }

            if (projectileCollision(m.projectile, player2)) {
                m.canShoot = true;
                m.projectile.onHit(player2);
            }

            if (destroyProjectile(m.projectile)) {
                m.canShoot = true;
            }
        }
        //randomMobsMovements(m);        
    })


    if (player2) {
        player2.draw(context);
        drawEntityAnimation(context, player2);
    }

    const endDate = new Date();
    const delta = (endDate.getTime() - startDate.getTime()) + 1;

    if (player2)
        player2.move(delta);

    player.move(delta);

    mobs.forEach(m => {
        m.move(delta);
    })

    requestAnimationFrame(loop);    
}