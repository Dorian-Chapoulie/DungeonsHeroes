import { Loot } from './loot.js';
import { sprites, spritesIds, soundsIds, sounds } from '../graphics/assets';

export class Coin extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, id);
        this.image = sprites[spritesIds.coin];
        this.pickUpSound = sounds[soundsIds.coin];
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