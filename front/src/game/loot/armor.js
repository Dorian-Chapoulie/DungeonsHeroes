import { Loot } from './loot.js';
import { sprites, spritesIds, soundsIds, sounds } from '../graphics/assets';

export class Armor extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, id);
        this.canDrawNextFrame = true;
        this.image = sprites[spritesIds.armor];
        this.pickUpSound = sounds[soundsIds.armor];
        this.width = 40;
        this.height = 42;
        this.scaleX = 32;
        this.scaleY = 32;
        this.drawTime = 350;
    }

    onPickUp(entity) {
        super.onPickUp();
        if (entity.shield != 100) {
            entity.shield += 15;
        }
        if (entity.shield > 100) {
            entity.shield = 100;
        }
    }
}