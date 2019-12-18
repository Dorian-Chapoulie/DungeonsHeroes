import { Loot } from './loot.js';

export class Heart extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/media/heart-sprite.png', '/media/sound/heart.mp3', id);
        this.canDrawNextFrame = true;
        this.width = 64;
        this.height = 64;
        this.scaleX = 32;
        this.scaleY = 32;
        this.drawTime = 200;
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.health += 20;
    }
}