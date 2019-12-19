import { Projectile } from '../projectiles/Projectile.js';
import { sprites, spritesIds } from '../graphics/assets';

export class PlayerProjectile extends Projectile {

    static type = 4;

    constructor(context, x, y, coef) {
        super(context, x, y, PlayerProjectile.type);

        this.image = sprites[spritesIds.playerProjectile];
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