import { Loot } from './loot.js';

export class Coin extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/media/coin-sprite.png', '/media/sound/coin.mp3', id);
        this.canDrawNextFrame = true;
        this.width = 64;
        this.height = 64;
        this.scaleX = 32;
        this.scaleY = 32;
        this.drawTime = 100;
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.health += 10;
    }
}