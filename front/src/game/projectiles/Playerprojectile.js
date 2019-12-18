import { Projectile } from '../projectiles/Projectile.js';

export class PlayerProjectile extends Projectile {

    static type = 4;

    constructor(context, x, y, coef) {
        super(context, x, y, PlayerProjectile.type);

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 32;
        this.height = 29;
        this.scaleX = 18;
        this.scaleY = 18;

        this.damageValue = 15 * coef;
    }

    onHit(entity) {
        super.onHit(entity);
    }
}