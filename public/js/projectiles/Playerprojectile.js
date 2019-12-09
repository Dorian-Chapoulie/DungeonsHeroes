import { Projectile } from '/js/projectiles/Projectile.js';

export class PlayerProjectile extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 1);

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 64;
        this.height = 64;

        this.damageValue = 15;
    }

    onHit(entity) {
        super.onHit(entity);
    }
}