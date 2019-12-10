import { Projectile } from '/js/projectiles/Projectile.js';

export class Fire extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 0);

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 32;
        this.height = 29;

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