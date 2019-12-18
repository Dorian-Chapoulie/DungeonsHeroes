import { Loot } from './loot.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Heart extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/assets/sound/heart.mp3', id);
        this.image = sprites[spritesIds.heart];
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