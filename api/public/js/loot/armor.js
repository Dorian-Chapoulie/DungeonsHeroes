import { Loot } from '/js/loot/loot.js';

export class Armor extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/media/shield-sprite.png', '/media/sound/armor.mp3', id);
        this.canDrawNextFrame = true;

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