import { Projectile } from '/js/projectiles/Projectile.js';

export class Frost extends Projectile {

    static type = 1;

    constructor(context, x, y) {
        super(context, x, y, Frost.type);

        this.image = new Image();
        this.image.src = '/media/frost-sprite.png';
        this.width = 24;
        this.height = 24;

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