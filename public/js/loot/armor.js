import { Loot } from '/js/loot/loot.js';



export class Armor extends Loot {
    constructor(context, x, y) {
        super(context, x, y, '/media/shield-sprite.png', '/media/sound/armor.mp3');
        this.canDrawNextFrame = true;
        this.interValFrameMS = 150;
    }

    onPickUp(entity) {
        if (entity.shield != 100) {
            super.onPickUp();
            entity.shield += 15;
        }
        if (entity.shield > 100) {
            entity.shield = 100;
        }
    }
}