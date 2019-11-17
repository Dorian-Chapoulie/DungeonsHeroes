import { initSocksEvents, sendMessage } from '/js/socketsHandler.js';
import { initInputsEvent, isKeyPressed, cansendNx, cansendNy } from '/js/inputsHandler.js';
import { drawEntityAnimation, drawMap } from '/js/graphics.js';
import { initChat } from '/js/chat.js';
import { mapLevel, tilesSize } from '/js/map.js';
import { Player } from '/js/player.js';
import { Skeleton } from '/js/skeleton.js';
import { Fire } from '/js/Fire.js';

var player, player2;
var mobs = [];
var canvas;
var context;
var fire = [];
var firemob = [];
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
    player = new Player(pseudo, 300, 300, undefined);
    mobs.push(new Skeleton("skeleton", 300, 50));
    //  mobs[0].dy = mobs[0].speed;
    // mobs[0].dx = mobs[0].speed;

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
    if (player.x + player.width > canvas.width && player.canMoveRight) {
        player.dx = 0;
        player.canMoveRight = false;
    } else {
        player.canMoveRight = true;
    }

    if (player.x <= 0 && player.canMoveLeft) {
        player.dx = 0;
        player.canMoveLeft = false;
    } else {
        player.canMoveLeft = true;
    }

    if (player.y + player.width > canvas.height && player.canMoveDown) {
        player.dy = 0;
        player.canMoveDown = false;
    } else {
        player.canMoveDown = true;
    }

    if (player.y < 0 && player.canMoveUp) {
        player.dy = 0;
        player.canMoveUp = false;
    } else {
        player.canMoveUp = true;
    }

    if (isKeyPressed("z") && player.canMoveUp) {
        player.dy = -player.speed;
        player.frameY = player.AVANCER;
        sendMessage('playermove', { pos: 'z', name: player.name });
        canSendNy = true;
    } else if (isKeyPressed("s") && player.canMoveDown) {
        player.dy = player.speed;
        player.frameY = player.RECULER;
        sendMessage('playermove', { pos: 's', name: player.name });
        canSendNy = true;
    } else if (cansendNy() && canSendNy) {
        player.dy = 0;
        sendMessage('playermove', { pos: 'ny', name: player.name });
        canSendNy = false;
    }

    if (isKeyPressed("q") && player.canMoveLeft) {
        player.dx = -player.speed;
        player.frameY = player.GAUCHE;
        sendMessage('playermove', { pos: 'q', name: player.name });
        canSendNx = true;
    } else if (isKeyPressed("d") && player.canMoveRight) {
        player.dx = player.speed;
        player.frameY = player.DROIT;
        sendMessage('playermove', { pos: 'd', name: player.name });
        canSendNx = true;
    } else if (cansendNx() && canSendNx) {
        player.dx = 0;
        sendMessage('playermove', { pos: 'nx', name: player.name });
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

function createFire(n) {
    for (let i = 0; i < n; i++) {
        if (fire[i] !== undefined) {
            if (fire[i].x >= canvas.width ||
                fire[i].x <= 0 ||
                fire[i].y >= canvas.height ||
                fire[i].y <= 0) {
                fire[i] = new Fire(context, player.x + player.width / 2, player.y, 0, 5);

            }
        } else {
            fire[i] = new Fire(context, player.x + player.width / 2, player.y, 0, 5);

        }
    }
}

function monsterFire(n) {
    for (let i = 0; i < n; i++) {
        if (firemob[i] !== undefined) {
            if (firemob[i].x >= canvas.width ||
                firemob[i].x <= 0 ||
                firemob[i].y >= canvas.height ||
                firemob[i].y <= 0) {
                firemob[i] = new Fire(context, mobs[0].x + mobs[0].width / 2, mobs[0].y, 0, 5);

            }
        } else {
            firemob[i] = new Fire(context, mobs[0].x + mobs[0].width / 2, mobs[0].y, 0, 5);

        }
    }
}

function drawFire() {
    fire.forEach((r) => {
        if (mobs.length > 0){
           r.draw();
        }
    })
    firemob.forEach((r) => {
        r.draw();
    })
}

function moveFire() {
    fire.forEach((r) => {
        if (mobs.length > 0) {
            r.move();
            projectileCollision(r, mobs[0]);
        }
    });
    firemob.forEach((r) => {
        r.move();
    });
}

//x = mobs[0].x + mobs[0].width / 3;
//mobs[0].x + mobs[0].width - (mobs[0].width / 3);
const projectileCollision = (projectile, entity) => {
    if (projectile.x >= entity.x + entity.width / 3 && projectile.x <= entity.x + entity.width - (entity.width / 3)) {
        if (projectile.y >= entity.y && projectile.y <= entity.y + entity.height / 2) {
            entity.damage(projectile.damageValue);
            entity.draw(context);
            projectile.x = -1; //TO-DO: correct way to delete the object
        }
    }
}

const loop = () => {
    //context.clearRect(0, 0, canvas.width, canvas.height);
    const startDate = new Date();
    drawMap(context, mapLevel, tilesSize);

    drawEntityAnimation(context, player);

    playerMovements();

    createFire(10);
    monsterFire(3);
    drawFire();
    moveFire();

    player.draw(context);

    mobs = mobs.filter(m => m.health > 0);
    mobs.forEach(m => {
        drawEntityAnimation(context, m);
        m.draw(context);
        randomMobsMovements(m);
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