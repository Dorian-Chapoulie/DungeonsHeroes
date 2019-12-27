import { Loot } from './loot.js';
import { sprites, spritesIds, soundsIds, sounds } from '../graphics/assets';

export class BoostDamage extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, id);
        this.image = sprites[spritesIds.boostDamage];
        this.pickUpSound = sounds[soundsIds.boostSpeed];
        this.canDrawNextFrame = true;
        this.width = 355;
        this.height = 504;
        this.scaleX = 28;
        this.scaleY = 28;
        this.drawTime = 500;
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.damageCoef += 0.1;
    }
}