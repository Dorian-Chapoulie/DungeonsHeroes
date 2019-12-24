export const sounds = {}
export const spritesIds = {
    boostDamage: 0,
    boostSpeed: 1,
    coin: 2,
    door: 3,
    heart: 4,
    playerProjectile: 5,
    player: 6,
    player2: 7,
    player3: 8,
    player4: 9,
    shield: 10,
    skeleton: 11,
    fireball: 12,
    tile1: 13,
    tile2: 14,
    tile3: 15,
    tile4: 16,
    torch: 17,
    warlock: 18,
    witch: 19,
    wizzard: 20,
    frost: 21,
}
export const sprites = [];
export const getMapTileFromId = id => {
    switch(id) {
        case 1:
            return sprites[spritesIds.tile1];            
        case 2:
            return sprites[spritesIds.tile2];
        case 3:
            return sprites[spritesIds.tile3];
        case 4:
            return sprites[spritesIds.tile4];
        default:
            return sprites[spritesIds.tile1];
    };
}

export const getPlayerSkinFromId = id => {
    switch(id) {
        case 1:
            return sprites[spritesIds.player];            
        case 2:
            return sprites[spritesIds.player2];
        case 3:
            return sprites[spritesIds.player3];
        case 4:
            return sprites[spritesIds.player4];
        default:
            return sprites[spritesIds.player];
    };
}

export const spritesNumber = 21;
export let loadedSprites = 0;

const createImage = (id, url) => {
    const image = new Image();             
    image.onload = () => {                                               
        createImageBitmap(image, 0, 0, image.width, image.height)
            .then(data => {               
                sprites[id] = data;      
                loadedSprites++;                      
            });            
    };
    image.src = url;     
}
  
const check = () => {
    return new Promise(resolve => {
        const interval = setInterval(() => {            
            if(loadedSprites == spritesNumber) {
                clearInterval(interval);
                loadedSprites = 0;
                resolve(true);
            }
        }, 200);           
    });
}
  
export const loadSprites = async () => {         
    sprites.boostDamage = createImage(spritesIds.boostDamage, '/assets/boostDamage-shield.png');    
    sprites.boostSpeed = createImage(spritesIds.boostSpeed, '/assets/boostSpeed-sprite.png');
    sprites.coin = createImage(spritesIds.coin, '/assets/coin-sprite.png');
    sprites.door = createImage(spritesIds.door, '/assets/door-sprite.png');
    sprites.heart = createImage(spritesIds.heart, '/assets/heart-sprite.png');
    sprites.playerProjectile = createImage(spritesIds.playerProjectile, '/assets/player-projectile-sprite.png');
    sprites.player = createImage(spritesIds.player, '/assets/player-sprite.png');
    sprites.player2 = createImage(spritesIds.player2, '/assets/player-sprite-2.png');
    sprites.player3 = createImage(spritesIds.player3, '/assets/player-sprite-3.png');
    sprites.player4 = createImage(spritesIds.player4, '/assets/player-sprite-4.png');
    sprites.shield = createImage(spritesIds.shield, '/assets/shield-sprite.png');
    sprites.skeleton = createImage(spritesIds.skeleton, '/assets/skeleton-sprite.png');
    sprites.fireball = createImage(spritesIds.fireball, '/assets/skeleton-fireball-sprite.png');
    sprites.tile1 = createImage(spritesIds.tile1, '/assets/tile1.png');
    sprites.tile2 = createImage(spritesIds.tile2, '/assets/tile2.png');
    sprites.tile3 = createImage(spritesIds.tile3, '/assets/tile3.png');
    sprites.tile4 = createImage(spritesIds.tile4, '/assets/tile4.png');
    sprites.torch = createImage(spritesIds.torch, '/assets/torch-sprite.png');
    sprites.warlock = createImage(spritesIds.warlock, '/assets/warlock-sprite.png');
    sprites.witch = createImage(spritesIds.witch, '/assets/witch-sprite.png');
    sprites.wizzard = createImage(spritesIds.wizzard, '/assets/wizzard-sprite.png'); 
    sprites.frost = createImage(spritesIds.frost, '/assets/frost-sprite.png');   
    await check(); 
}