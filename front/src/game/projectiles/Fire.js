import { Projectile } from '../projectiles/Projectile.js';

export class Fire extends Projectile {

    static type = 0;

    constructor(context, x, y) {
        super(context, x, y, Fire.type);

        this.image = new Image();
        this.image.src = '/media/skeleton-fireball-sprite.png';
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