export const sounds = [];
export const sprites = [];

export const soundsIds = {
    armor: 0,
    boostSpeed: 1,
    coin: 2,
    door: 3,
    fireball: 4,
    heart: 5,
    ice: 6,
    player: 7,
    playerDamage: 8,
    poison: 9,
    silence: 10,
    theme: 11,
    torch: 12,
    bossSound: 13,
    key: 14,
}

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
    armor: 10,
    skeleton: 11,
    fireball: 12,
    tile1: 13,
    tile2: 14,
    tile3: 15,
    tile4: 16,
    torch: 17,
    warlock: 18,
    witch: 19,
    poison: 20,
    wizzard: 21,
    frost: 22,
    tile5: 23,
    tile6: 24,
    defaultPlayer: 25,
    chest: 26,
    boss: 27,
    key: 28,

}


export const getMapTileFromId = id => {
    switch (id) {
        case 1:
            return sprites[spritesIds.tile1];
        case 2:
            return sprites[spritesIds.tile2];
        case 3:
            return sprites[spritesIds.tile3];
        case 4:
            return sprites[spritesIds.tile4];
        case 5:
            return sprites[spritesIds.tile5];
        case 6:
            return sprites[spritesIds.tile6];
        default:
            return sprites[spritesIds.tile1];
    };
}

export const getPlayerSkinFromId = id => {
    switch (id) {
        case 1:
            return sprites[spritesIds.player];
        case 2:
            return sprites[spritesIds.player2];
        case 3:
            return sprites[spritesIds.player3];
        case 4:
            return sprites[spritesIds.player4];
        default:
            return sprites[spritesIds.defaultPlayer];
    };
}

export const spritesNumber = Object.keys(soundsIds).length + Object.keys(spritesIds).length;
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

const createAudio = (id, url) => {
    const audio = new Audio(url);
    audio.onloadeddata = () => {
        sounds[id] = audio;
        loadedSprites++;
    };
}

const check = () => {
    return new Promise(resolve => {
        const interval = setInterval(() => {
            if (loadedSprites == spritesNumber) {
                clearInterval(interval);
                loadedSprites = 0;
                resolve(true);
            }
        }, 200);
    });
}

export const loadSprites = async() => {
    createImage(spritesIds.boostDamage, '/assets/boostDamage-sprite.png');
    createImage(spritesIds.boostSpeed, '/assets/boostSpeed-sprite.png');
    createImage(spritesIds.coin, '/assets/coin-sprite.png');
    createImage(spritesIds.door, '/assets/door-sprite.png');
    createImage(spritesIds.heart, '/assets/heart-sprite.png');
    createImage(spritesIds.playerProjectile, '/assets/player-projectile-sprite.png');
    createImage(spritesIds.player, '/assets/player-sprite.png');
    createImage(spritesIds.player2, '/assets/player-sprite-2.png');
    createImage(spritesIds.player3, '/assets/player-sprite-3.png');
    createImage(spritesIds.player4, '/assets/player-sprite-4.png');
    createImage(spritesIds.armor, '/assets/shield-sprite.png');
    createImage(spritesIds.skeleton, '/assets/skeleton-sprite.png');
    createImage(spritesIds.fireball, '/assets/skeleton-fireball-sprite.png');
    createImage(spritesIds.tile1, '/assets/tile1.png');
    createImage(spritesIds.tile2, '/assets/tile2.png');
    createImage(spritesIds.tile3, '/assets/tile3.png');
    createImage(spritesIds.tile4, '/assets/tile4.png');
    createImage(spritesIds.torch, '/assets/torch-sprite.png');
    createImage(spritesIds.warlock, '/assets/warlock-sprite.png');
    createImage(spritesIds.witch, '/assets/witch-sprite.png');
    createImage(spritesIds.poison, '/assets/poison-sprite.png');
    createImage(spritesIds.wizzard, '/assets/wizzard-sprite.png');
    createImage(spritesIds.frost, '/assets/frost-sprite.png');
    createImage(spritesIds.tile5, '/assets/tile5.png');
    createImage(spritesIds.tile6, '/assets/tile6.png');
    createImage(spritesIds.defaultPlayer, '/assets/default-player-sprite.png');
    createImage(spritesIds.chest, '/assets/chest-sprite.png');
    createImage(spritesIds.boss, '/assets/boss-sprite.png');
    createImage(spritesIds.key, '/assets/key.png');

    createAudio(soundsIds.armor, '/assets/sound/armor.mp3');
    createAudio(soundsIds.boostSpeed, '/assets/sound/boostSpeed.mp3');
    createAudio(soundsIds.coin, '/assets/sound/coin.mp3');
    createAudio(soundsIds.door, '/assets/sound/door.mp3');
    createAudio(soundsIds.fireball, '/assets/sound/fireball-cast.mp3');
    createAudio(soundsIds.heart, '/assets/sound/heart.mp3');
    createAudio(soundsIds.ice, '/assets/sound/ice-cast.mp3');
    createAudio(soundsIds.player, '/assets/sound/player-cast.mp3');
    createAudio(soundsIds.playerDamage, '/assets/sound/player-damage.mp3');
    createAudio(soundsIds.poison, '/assets/sound/poison-cast.mp3');
    createAudio(soundsIds.silence, '/assets/sound/silence-cast.mp3');
    createAudio(soundsIds.theme, '/assets/sound/theme.mp3');
    createAudio(soundsIds.torch, '/assets/sound/torch.mp3');
    createAudio(soundsIds.bossSound, '/assets/sound/bossSound.mp3');
    createAudio(soundsIds.key, '/assets/sound/key.mp3');
    await check();
}