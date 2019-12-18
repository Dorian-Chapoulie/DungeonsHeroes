import { Loot } from './loot.js';

export class BoostSpeed extends Loot {
    constructor(context, x, y, id) {
        super(context, x, y, '/assets/boostSpeed-sprite.png', '/assets/sound/boostSpeed.mp3', id);
        this.canDrawNextFrame = true;
        this.width = 355;
        this.height = 504;
        this.scaleX = 28;
        this.scaleY = 28;
        this.drawTime = 500;
    }

    onPickUp(entity) {
        super.onPickUp();
        entity.speed += 0.01;
    }
}