import { Loot } from '/js/loot/loot.js';

export class Coin extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/media/coin-sprite.png', '/media/sound/coin.mp3', id);
        this.canDrawNextFrame = true;  
        this.width = 64;
        this.height = 64;
        this.scaleX = 64;
        this.scaleY = 64;                             
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.health += 10;
    }
}