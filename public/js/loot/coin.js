import { Loot } from '/js/loot/loot.js';

export class Coin extends Loot {
    constructor(context, x, y) {
        super(context, x, y, '/media/coin-sprite.png');
        this.canDrawNextFrame = true;  
        this.interValFrameMS = 150;                  
    }

    onPickUp(entity) {
        entity.health += 10;
    }
}