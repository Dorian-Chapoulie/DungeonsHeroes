import { Loot } from './loot.js';
import { sendMessage } from '../network/socketsHandler';
import { sprites, spritesIds, soundsIds, sounds } from '../graphics/assets';

export class Key extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, id);
        this.image = sprites[spritesIds.key];
        this.pickUpSound = sounds[soundsIds.key];
        this.canDrawNextFrame = true;
        this.width = 33;
        this.height = 78;
        this.scaleX = 64;
        this.scaleY = 64;
        this.drawTime = 140;
    }

    onPickUp(entity) {
        super.onPickUp();    
        sendMessage('keypickedup', {});    
    }
}