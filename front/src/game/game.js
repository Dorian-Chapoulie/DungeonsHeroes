import { sendMessage } from './network/socketsHandler.js';
import { isKeyPressed, cansendNx, cansendNy } from './inputs/inputsHandler.js';
import { drawEntityAnimation, drawMap } from './graphics/graphics.js';
import { initChat } from './network/chat.js';
import { mapLevel, tilesSize } from './network/map.js';
import { Player } from './entity/player.js';
import { Skeleton } from './entity/skeleton.js';
import { Wizzard } from './entity/wizzard.js';
import { Witch } from './entity/witch.js';
import { Warlock } from './entity/warlock.js';
import { Torch } from './entity/torch.js';
import { Door } from './entity/door.js';
import { Chest } from './entity/chest';
import { Boss } from './entity/boss';
import { Coin } from './loot/coin.js';
import { Heart } from './loot/heart.js';
import { Armor } from './loot/armor.js';
import { Key } from './loot/key.js';
import { BoostSpeed } from './loot/boostSpeed.js';
import { BoostDamage } from './loot/boostDamage.js';
import { Fire } from './projectiles/Fire.js';
import { Frost } from './projectiles/Frost.js';
import { Poison } from './projectiles/Poison.js';
import { Silence } from './projectiles/Silence.js';
import { PlayerProjectile } from './projectiles/Playerprojectile.js';
import { sounds, soundsIds } from './graphics/assets';

export var player;
export var player2;
var mobs = [];
var loots = [];
var lightenEntitys = [];
var chests = [];
var canvas;
var context;
var canSendNx = false;
var canSendNy = false;
var isSoungPlayed = false;
var isBossSoungPlayed = false;
var isBossLevel = false;
var door;
var isPlaying = true;

const clearVariables = () => {
    sounds.forEach(s => {
        if(s !== sounds[soundsIds.theme] && s !== sounds[soundsIds.bossSound])  {            
            s.pause();
            s.currentTime = 0;
        }
    })
    
    player = undefined;
    player2 = undefined;
    mobs = [];
    loots = [];
    lightenEntitys = [];
    chests = [];
    canvas = undefined;
    context = undefined;
    canSendNx = false;
    canSendNy = false;
    isSoungPlayed = false;
    isBossLevel = false;
    door = undefined;
    isPlaying = true;    
}

export const stopLoop = () => {
    isPlaying = false;
}
export const setNewPlayer = (newPlayer) => {
    player2 = newPlayer;
}
export const getContext = () => context;
export const getNewPlayer = () => player2;
export const getLocalPlayer = () => {    
    return player;
}

export const respawnPlayer = data => { 
    if(player && player.socketId !== data.id) {
        player.ulti = 0; 
        player2 = new Player(data.name, 36, 762, data.id, context, data.skinId);         
        if(isBossLevel) {
            if(mobs[0]) {
                if(mobs[0].targets[0] === undefined) {
                    mobs[0].targets[0] = player2;
                }else if(mobs[0].targets[1] === undefined) {
                    mobs[0].targets[1] = player2;
                }
            }
        }  
    }else if(player2 && player2.socketId !== data.id){ 
        player2.ulti = 0;
        player = new Player(data.name, 36, 762, data.id, context, data.skinId); 
        if(isBossLevel) {
            if(mobs[0]) {
                if(mobs[0].targets[0] === undefined) {
                    mobs[0].targets[0] = player;
                }else if(mobs[0].targets[1] === undefined) {
                    mobs[0].targets[1] = player;
                }
            }
        }  
    }     
} 

export const player2ShootAt = entityId => {
    if (player2) {
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
            player.coin += 2;
            player.incrementUlti(5);
            projectile.onHit(target);
        } else if (player2 && sender === player2.name) {
            projectile = new PlayerProjectile(context, 0, 0, player2.damageCoef);
            player2.coin += 2;
            player2.incrementUlti(5);
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
            if (target && projectile) projectile.onHit(target);
        }
    }
}

export const damageTorch = (health, torchId) => {
    lightenEntitys.map(le => {
        if (le.id === torchId) {
            le.health = health;
        }
    })
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
    if (player2 && player2.socketId === targetId) {
        target = player2;
    } else if (player && player.socketId === targetId) {
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
        case 4:
            chests.push(new Chest(pos.x, pos.y, context, id));
            break;
        case 5:
            isBossLevel = true;
            mobs.push(new Boss(pos.x, pos.y, [player, player2], context, id));
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
        case 4:
            loots.push(new BoostDamage(context, pos.x, pos.y, id));
            break;
        case 5:
            loots.push(new Key(context, pos.x, pos.y, id));
            break;
    }
}

export const getDoor = () => door;

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

export const init = (pseudo, skinId) => {
    canvas = document.getElementById('Canvas');
    context = canvas.getContext('2d');
    player = new Player(pseudo, 300, 800, undefined, context, skinId);        
    isPlaying = true;
    door = new Door(280, -1, context);
    lightenEntitys.push(new Torch(32, 32, context, -1));
    lightenEntitys.push(new Torch(canvas.width - 65, 32, context, -2));
    lightenEntitys.push(new Torch(32, canvas.height - 80, context, -3));
    lightenEntitys.push(new Torch(canvas.width - 65, canvas.height - 80, context, -4));

    sounds[soundsIds.bossSound].volume = 0.1;
    sounds[soundsIds.theme].volume = 0.2;
    sounds[soundsIds.player].volume = 0.2;    
    sounds[soundsIds.theme].play();


    sendMessage('newplayer', { name: pseudo, x: player.x, y: player.y, skinId });
    sendMessage('getmap');

    drawMap(context, mapLevel, tilesSize);
    requestAnimationFrame(loop);

    setInterval(() => {
        if (player) sendMessage('playerpos', { x: player.x, y: player.y });
    }, 20);

    setInterval(() => {
        if (player) sendMessage('playerhs', { health: player.health, shield: player.shield });
    }, 2 * 100);
}

const playerMovements = () => {

    /* Collision Murs */
    if (player.x + player.width + 32 > canvas.width - 32) {
        player.dx = 0;
        player.canMoveRight = false;
    } else {
        player.canMoveRight = true;
    }

    if (player.x < 32) {
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

    if(isKeyPressed("a") && player.ulti >= 100 && !player2) { 
        sendMessage('respawnplayer', {});                
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
    //context.clearRect(0, 0, canvas.width, canvas.height);
    drawMap(context, mapLevel, tilesSize);    

    if (isBossLevel && !isBossSoungPlayed) {
        isBossSoungPlayed = true;
        sounds[soundsIds.theme].pause();
        sounds[soundsIds.bossSound].play();
    }

    if (player) {
        drawEntityAnimation(player);
        if(player.health <= 0) {            
            sendMessage('deadplayer', {}); 
            if(isBossLevel) {
                if(mobs[0]) {
                    if(mobs[0].targets[0] && mobs[0].targets[0].socketId === player.socketId) {
                        mobs[0].targets[0] = undefined;
                    }else if(mobs[0].targets[1] && mobs[0].targets[1].socketId === player.socketId) {
                        mobs[0].targets[1] = undefined;
                    }
                }
            }
            player = undefined;
        }
    }

    drawEntityAnimation(door);
    if (door.canOpen && player && entityCollision(player, door)) {
        door.canOpen = false;
        sendMessage('enternextlevel', {});
    }
    if (lightenEntitys.length > 0) {
        lightenEntitys.forEach(l => {
            if (((player && entityCollision(player, l)) || (player2 && entityCollision(player2, l))) && l.canProcessLight == false) {
                l.canProcessLight = true;
                sounds[soundsIds.torch].play();
            }
            if (player && entityCollision(player, l) && player.health < player.maxHealth) {
                l.onTouch(player);
                sendMessage('touchtorch', { health: l.health, id: l.id });
            }
            if (player2 && entityCollision(player2, l) && player2.health < player2.maxHealth) {
                l.onTouch(player2);
                sendMessage('touchtorch', { health: l.health, id: l.id });
            }
            l.draw();
            l.processLight();
            drawEntityAnimation(l);
        });
        lightenEntitys = lightenEntitys.filter(e => e.health > 0);
    }

    if (chests.length > 0) {
        chests.forEach(c => {
            c.processLight();
            drawEntityAnimation(c);
            if (((player && entityCollision(player, c)) || (player2 && entityCollision(player2, c)))) {
                sendMessage('chestopen', { name: c.name, position: { x: c.x, y: c.y }, id: c.id });
                c.health = 0;
            }
        });
        chests = chests.filter(c => c.health > 0);
    }

    if(player) {
        playerMovements();
        player.draw();
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
                //sendMessage('hitentity', { id: m.id, type: player2.projectiles[i].type, shootId: player2.shootId, sender: player2.name });
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
            if(isBossLevel) {
                if(mobs[0]) {
                    if(mobs[0].targets[0] && mobs[0].targets[0].socketId === player2.socketId) {
                        mobs[0].targets[0] = undefined;
                    }else if(mobs[0].targets[1] && mobs[0].targets[1].socketId === player2.socketId) {
                        mobs[0].targets[1] = undefined;
                    }
                }
            }
            player2 = undefined;        
        }
    }

    const delta = 1; //(endDate.getTime() - startDate.getTime()) + 1;

    if (player2)
        player2.move(delta);

    if (player) {
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

    if(isPlaying) 
        requestAnimationFrame(loop);
    else 
        clearVariables();
}