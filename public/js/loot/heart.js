import { Loot } from '/js/loot/loot.js';

export class Heart extends Loot {
    constructor(context, x, y) {
        super(context, x, y, '/media/heart-sprite.png', '/media/sound/heart.mp3');
        this.canDrawNextFrame = true;  
        this.interValFrameMS = 150;                  
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.health += 20;
    }
}