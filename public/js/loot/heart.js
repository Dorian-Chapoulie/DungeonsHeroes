import { Loot } from '/js/loot/loot.js';

export class Heart extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/media/heart-sprite.png', '/media/sound/heart.mp3', id);
        this.canDrawNextFrame = true;  
        this.width = 64;
        this.height = 64;
        this.scaleX = 64;
        this.scaleY = 64;             
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.health += 20;
    }
}