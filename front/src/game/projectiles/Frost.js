import { Projectile } from '../projectiles/Projectile.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Frost extends Projectile {

    static type = 1;

    constructor(context, x, y) {
        super(context, x, y, Frost.type);

<<<<<<< HEAD:api/public/js/projectiles/Frost.js
        this.image = new Image();
        this.image.src = '/media/frost-sprite.png';
        this.width = 24;
        this.height = 24;
=======
        this.image = sprites[spritesIds.playerProjectile];
        this.width = 32;
        this.height = 29;
>>>>>>> master:front/src/game/projectiles/Frost.js

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