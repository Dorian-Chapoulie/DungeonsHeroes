import { initSocksEvents, sendMessage } from '/js/network/socketsHandler.js';
import { initInputsEvent, isKeyPressed, cansendNx, cansendNy } from '/js/inputs/inputsHandler.js';
import { drawEntityAnimation, drawMap } from '/js/graphics/graphics.js';
import { initChat } from '/js/network/chat.js';
import { mapLevel, tilesSize } from '/js/network/map.js';
import { Player } from '/js/entity/player.js';
import { Skeleton } from '/js/entity/skeleton.js';
import { Wizzard } from '/js/entity/wizzard.js';
import { Witch } from '/js/entity/witch.js';
import { Warlock } from '/js/entity/warlock.js';
import { Torch } from '/js/entity/torch.js';
import { Door } from '/js/entity/door.js';
import { Coin } from '/js/loot/coin.js';
import { Heart } from '/js/loot/heart.js';
import { Armor } from '/js/loot/armor.js';
import { BoostSpeed } from '/js/loot/boostSpeed.js';
import { Fire } from '/js/projectiles/Fire.js';
import { Frost } from '/js/projectiles/Frost.js';
import { Poison } from '/js/projectiles/Poison.js';
import { Silence } from '/js/projectiles/Silence.js';
import { PlayerProjectile } from '/js/projectiles/Playerprojectile.js';


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
var door;

document.addEventListener("DOMContentLoaded", () => init());

export const setNewPlayer = (newPlayer) => {
    player2 = newPlayer;
}
export const getContext = () => context;
export const getNewPlayer = () => player2;
export const getLocalPlayer = () => player;
export const player2ShootAt = entityId => {
    if(player2) {
        mobs.forEach(m => {
            if (m.id === entityId) {
                player2.target = m;
            }
        });
    }
}
export const damageEntity = (entityId, type, sender) => {
    let target = undefined;
    let projectile = undefined;

    mobs.forEach(m => {
        if (m.id === entityId) {
            target = m;
        }
    })
    if (player && player.name == entityId) {
        target = player;
    }
    if (player2 && player2.name == entityId) {
        target = player2;
    }

    if (target !== undefined) {
        //target.name
        if (player && sender === player.name) {
            projectile = new PlayerProjectile(context, 0, 0, player.damageCoef);
            projectile.onHit(target);
        } else if (player2 && sender === player2.name) {
            projectile = new PlayerProjectile(context, 0, 0, player2.damageCoef);            
            projectile.onHit(target);
        } else {
            switch (type) {
                case 0: //fire
                    projectile = new Fire(context, 0, 0);
                    break;
                case 1: //frost
                    projectile = new Frost(context, 0, 0);
                    break;
                case 2: //poison
                    projectile = new Poison(context, 0, 0);
                    break;
                case 3: //silence
                    projectile = new Silence(context, 0, 0);
                    break;
            }
            if(target) projectile.onHit(target);
        }
    }
}

export const playerPickUpLoot = (lootId, playername) => {
    if (player && player.name === playername) {
        for (let i = 0; i < loots.length; i++) {
            if (loots[i] && loots[i].id === lootId) {
                loots[i].onPickUp(player);
                loots[i] = undefined;
                break;
            }
        }
    } else if (player2 && player2.name === playername) {
        for (let i = 0; i < loots.length; i++) {
            if (loots[i] && loots[i].id === lootId) {
                loots[i].onPickUp(player2);
                loots[i] = undefined;
                break;
            }
        }
    }
}

export const manageDeadMob = (mobId) => {
    if (player && player.target && player.target.id === mobId) {
        player.target = undefined;
    }
    if (player2 && player2.target && player2.target.id === mobId) {
        player2.target = undefined;
    }

    mobs = mobs.filter(m => m.id !== mobId);
}
export const addMob = (mobType, pos, targetId, id) => {
    let target = undefined;    
    if(player2 && player2.socketId === targetId) {
        target = player2;
    }else if(player && player.socketId === targetId){
        target = player;
    }    

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
        case 3:
            mobs.push(new Warlock(pos.x, pos.y, target, context, id));
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
        case 3: //boostSpeed
            loots.push(new BoostSpeed(context, pos.x, pos.y, id));
            break;
    }
}

export const getDoor = () => door;

export const respawnPlayer = data => {
    if(player && player.socketId !== data.id) {
        player2 = new Player(data.name, 36, 762, data.id, context);      
    }else if(player2 && player2.socketId !== data.id){
        player = new Player(data.name, 36, 762, data.id, context);
    }    
}

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}


function playSound(url) {
    var audio = document.createElement('audio');
    audio.style.display = "none";
    audio.src = url;
    audio.autoplay = true;
    audio.onended = function() {
        audio.remove() //Remove when played.
    };
    document.body.appendChild(audio);
}

const init = () => {
    initSocksEvents();
    initInputsEvent();
    initChat();

    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');

    const pseudo = prompt("votre pseudo:");
    player = new Player(pseudo, 300, 800, undefined, context);
    door = new Door(280, -1, context);
    lights.push(new Torch(400, 300, context));

    const intervalSong = setInterval(() => {
        if (isSoungPlayed) {
            clearInterval(intervalSong);
        }
        themeSong.play().then(() => {
            isSoungPlayed = true;
            themeSong.volume = 0.7;
        }).catch(() => isSoungPlayed = false);

    }, 100);

    /*setInterval(() => {
        if(player) player.incrementUlti(5);        
    }, 500);*/

    sendMessage('newplayer', { name: pseudo, x: player.x, y: player.y });

    drawMap(context, mapLevel, tilesSize);
    requestAnimationFrame(loop);

    setInterval(() => {
        if(player) sendMessage('playerpos', { x: player.x, y: player.y });
    }, 20);

    setInterval(() => {
        if(player) sendMessage('playerhs', { health: player.health, shield: player.shield });
    }, 2 * 100);
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
        //sendMessage('playermove', 'z');
        canSendNy = true;
    } else if (isKeyPressed("s") && player.canMoveDown) {
        player.dy = player.speed;
        player.frameY = player.RECULER;
        //sendMessage('playermove', 's');
        canSendNy = true;
    } else if (cansendNy() && canSendNy) {
        player.dy = 0;
        //sendMessage('playermove', 'ny');
        canSendNy = false;
    }

    if (isKeyPressed("q") && player.canMoveLeft) {
        player.dx = -player.speed;
        player.frameY = player.GAUCHE;
        //sendMessage('playermove', 'q');
        canSendNx = true;
    } else if (isKeyPressed("d") && player.canMoveRight) {
        player.dx = player.speed;
        player.frameY = player.DROIT;
        //sendMessage('playermove', 'd');
        canSendNx = true;
    } else if (cansendNx() && canSendNx) {
        player.dx = 0;
        //sendMessage('playermove', 'nx');
        canSendNx = false;
    }
}

const entityCollision = (a, b) => {
    if (a.x < b.x + b.scaleX &&
        a.x + a.scaleX > b.x &&
        a.y < b.y + b.scaleY &&
        a.scaleY + a.y > b.y) {
        return true;
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
    drawMap(context, mapLevel, tilesSize);

    if(player) {
        drawEntityAnimation(player);
        playerMovements();
        player.draw();
        if(isKeyPressed("a") && player.ulti >= 100) {
            sendMessage('respawnplayer', {});   
            player.ulti = 0;
        }
    }

    drawEntityAnimation(door);
    if(door.canOpen && player && entityCollision(player, door)) {        
        sendMessage('enternextlevel', {});        
    }
    if (lights.length > 0) {
        lights.forEach(l => {
            if (((player && entityCollision(player, l)) || (player2 && entityCollision(player2, l))) && l.canProcessLight == false) {
                l.canProcessLight = true;
                playSound('/media/sound/torch.mp3');
            }
            l.processLight();
            drawEntityAnimation(l);
        });
    }

    const deadMobs = mobs.filter(m => m.health <= 0);
    deadMobs.forEach(dm => {
        if (player && player.target === dm) {
            player.target = undefined;
        }
        if (player2 && player2.target === dm) {
            player2.target = undefined;
        }
        sendMessage('deadmob', { name: dm.name, position: { x: dm.x, y: dm.y }, id: dm.id });
    });

    if (loots.length > 0) {
        loots = loots.filter(l => l !== undefined);
        for (let i = 0; i < loots.length; i++) {
            drawEntityAnimation(loots[i]);
            if (player && entityCollision(loots[i], player)) {
                sendMessage('lootpickup', { lootId: loots[i].id, picker: player.name });
            }
        };
    }
    mobs = mobs.filter(m => m.health > 0);

    if (player && !player.target) {
        player.target = mobs[getRandomInt(mobs.length)];
    } else if (player && player.target) {
        sendMessage('playershoot', player.target.id);
        player.shoot();
    }

    mobs.forEach(m => {
        drawEntityAnimation(m);
        m.draw();
        m.shoot();
        const playerProjectiles = player ? player.projectiles.length : 0;
        const player2Projectiles = player2 ? player2.projectiles.length : 0;

        for (let i = 0; i < playerProjectiles; i++) {
            if (player && player.projectiles[i] && entityCollision(player.projectiles[i], m)) {
                //player.canShoot = true;
                sendMessage('hitentity', { id: m.id, type: player.projectiles[i].type, shootId: player.shootId, sender: player.name });
                player.projectiles[i] = undefined;
            }
        }
        for (let i = 0; i < player2Projectiles; i++) {
            if (player2 && player2.projectiles[i] && entityCollision(player2.projectiles[i], m)) {
                //player2.canShoot = true;
                sendMessage('hitentity', { id: m.id, type: player2.projectiles[i].type, shootId: player2.shootId, sender: player2.name });
                player2.projectiles[i] = undefined;
            }
        }

        for (let i = 0; i < m.projectiles.length; i++) {
            //m.projectiles[i].move();
            if (player && m.projectiles[i] && entityCollision(m.projectiles[i], player)) {
                //m.canShoot = true;
                sendMessage('hitentity', { id: player.name, type: m.projectiles[i].type, shootId: m.shootId, sender: m.id });
                m.projectiles[i] = undefined;
            }

            if (player2 && m.projectiles[i] && entityCollision(m.projectiles[i], player2)) {
                //m.canShoot = true;
                sendMessage('hitentity', { id: player2.name, type: m.projectiles[i].type, shootId: m.shootId, sender: m.id });
                m.projectiles[i] = undefined;
            }

            if (m.projectiles[i] && destroyProjectile(m.projectiles[i])) {
                //m.canShoot = true;
                m.projectiles[i] = undefined;
            }
        }
        m.projectiles = m.projectiles.filter(p => p != undefined);
        //randomMobsMovements(m);        
    })


    if (player2) {
        player2.draw();
        drawEntityAnimation(player2);


        for (let i = 0; i < player2.projectiles.length; i++) {
            if (player2.projectiles[i] && destroyProjectile(player2.projectiles[i])) {
                player2.projectiles[i] = undefined;
                //player.canShoot = true;
            }
        }
        player2.projectiles = player2.projectiles.filter(p => p !== undefined);

        if (player2.target) {
            player2.shoot();
        }

        if(player2.health <= 0) {
            player2 = undefined;
        }
    }
    
    const delta = 1;

    if (player2)
        player2.move(delta);

    if(player) {
        player.move(delta);
        for (let i = 0; i < player.projectiles.length; i++) {
            if (player.projectiles[i] && destroyProjectile(player.projectiles[i])) {
                player.projectiles[i] = undefined;
                //player.canShoot = true;
            }
        }
        player.projectiles = player.projectiles.filter(p => p !== undefined);
    }

    mobs.forEach(m => {
        m.move(delta);
    })

    if(player && player.health <= 0) {
        player = undefined;
    }

    requestAnimationFrame(loop);
}