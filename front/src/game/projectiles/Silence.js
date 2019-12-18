import { Projectile } from '../projectiles/Projectile.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Silence extends Projectile {

    static type = 3;

    constructor(context, x, y) {
        super(context, x, y, Silence.type);

        this.image = sprites[spritesIds.playerProjectile];
        this.width = 32;
        this.height = 29;

        this.damageValue = 1;
        this.speed = 1;
    }

    onHit(entity) {
        super.onHit(entity);
        if (entity.canAffect) {
            entity.canAffect = false;
            entity.isSilenced = true;

            setTimeout(() => {
                entity.canAffect = true;
                entity.isSilenced = false;                
            }, 5000);

        }
    }
}