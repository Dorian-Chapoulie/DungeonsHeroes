export const sounds = {}
export const spritesIds = {
    boostDamage: 0,
    boostSpeed: 1,
    coin: 2,
    door: 3,
    heart: 4,
    playerProjectile: 5,
    player: 6,
    shield: 7,
    skeleton: 8,
    fireball: 9,
    tile1: 10,
    tile2: 11,
    tile3: 12,
    tile4: 13,
    torch: 14,
    warlock: 15,
    witch: 16,
    wizzard: 17,
}
export const sprites = [];


const createImage = (id, url) => {    
    const image = new Image();        
    image.src = url;        

    return new Promise(function(resolve, reject) {                
        image.onload = () => {                               
            console.log("loaded", url);

            createImageBitmap(image, 0, 0, image.width, image.height)
            .then(data => {               
                sprites[id] = data;                            
            });
            resolve("ok")
        };
    });                              
}
     
export const loadSprites = async () => {    
    sprites.boostDamage = await createImage(spritesIds.boostDamage, '/assets/boostDamage-shield.png');    
    sprites.boostSpeed = await createImage(spritesIds.boostSpeed, '/assets/boostSpeed-sprite.png');
    sprites.coin = await createImage(spritesIds.coin, '/assets/coin-sprite.png');
    sprites.door = await createImage(spritesIds.door, '/assets/door-sprite.png');
    sprites.heart = await createImage(spritesIds.heart, '/assets/heart-sprite.png');
    sprites.playerProjectile = await createImage(spritesIds.playerProjectile, '/assets/player-projectile-sprite.png');
    sprites.player = await createImage(spritesIds.player, '/assets/player-sprite.png');
    sprites.shield = await createImage(spritesIds.shield, '/assets/shield-sprite.png');
    sprites.skeleton = await createImage(spritesIds.skeleton, '/assets/skeleton-sprite.png');
    sprites.fireball = await createImage(spritesIds.fireball, '/assets/skeleton-fireball-sprite.png');
    sprites.tile1 = await createImage(spritesIds.tile1, '/assets/tile1.png');
    sprites.tile2 = await createImage(spritesIds.tile2, '/assets/tile2.png');
    sprites.tile3 = await createImage(spritesIds.tile3, '/assets/tile3.png');
    sprites.tile4 = await createImage(spritesIds.tile4, '/assets/tile4.png');
    sprites.torch = await createImage(spritesIds.torch, '/assets/torch-sprite.png');
    sprites.warlock = await createImage(spritesIds.warlock, '/assets/warlock-sprite.png');
    sprites.witch = await createImage(spritesIds.witch, '/assets/witch-sprite.png');
    sprites.wizzard = await createImage(spritesIds.wizzard, '/assets/wizzard-sprite.png');
    console.log("done")
}