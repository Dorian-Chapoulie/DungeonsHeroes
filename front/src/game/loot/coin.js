import { Loot } from './loot.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Coin extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/assets/sound/coin.mp3', id);
        this.image = sprites[spritesIds.coin];
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