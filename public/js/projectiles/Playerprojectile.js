import { Projectile } from '/js/projectiles/Projectile.js';

export class PlayerProjectile extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 4);

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 32;
        this.height = 29;
        this.scaleX = 18;
        this.scaleY = 18;

        this.damageValue = 15;
    }

    onHit(entity) {
        super.onHit(entity);
    }
}