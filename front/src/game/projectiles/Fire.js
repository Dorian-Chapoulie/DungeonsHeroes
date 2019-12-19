import { Projectile } from '../projectiles/Projectile.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Fire extends Projectile {

    static type = 0;

    constructor(context, x, y) {
        super(context, x, y, Fire.type);

        this.image = sprites[spritesIds.fireball];
        this.width = 65;
        this.height = 64;

        this.damageValue = 1;
        this.dotTime = 3000;
    }

    onHit(entity) {
        if (entity.canAffect) {
            entity.canAffect = false;
            const interval = setInterval(() => {
                super.onHit(entity);
            }, 100);
            setTimeout(() => {
                entity.canAffect = true;
                clearInterval(interval);
            }, this.dotTime);

        }
    }
}