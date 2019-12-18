import { Projectile } from '../projectiles/Projectile.js';

export class Frost extends Projectile {

    static type = 1;

    constructor(context, x, y) {
        super(context, x, y, Frost.type);

        this.image = new Image();
        this.image.src = '/assets/player-projectile-sprite.png';
        this.width = 32;
        this.height = 29;

        this.damageValue = 5;
    }

    onHit(entity) {
        super.onHit(entity);
        if (entity.canAffect) {
            entity.canAffect = false;
            const temp = entity.speed;
            entity.speed *= 0.5;

            setTimeout(() => {
                entity.canAffect = true;
                entity.speed = temp;
            }, 2000);

        }
    }
}