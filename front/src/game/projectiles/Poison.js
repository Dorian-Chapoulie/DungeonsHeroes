import { Projectile } from '../projectiles/Projectile.js';
import { sprites, spritesIds } from '../graphics/assets';

export class Poison extends Projectile {

    static type = 2;

    constructor(context, x, y) {
        super(context, x, y, Poison.type);

        this.image = sprites[spritesIds.playerProjectile];
        this.width = 32;
        this.height = 29;


        this.damageValue = 1;
        this.speed = 1;
    }

    onHit(entity) {
        super.onHit(entity);
        if(entity.canAffect) {                        
            entity.canAffect = false;
            const temp = entity.speed;
            entity.speed = 0;

            setTimeout(() => {
                entity.canAffect = true;
                entity.speed = temp;
            }, 1000);

        }
    }
}