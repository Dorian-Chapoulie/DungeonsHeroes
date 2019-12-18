import { Projectile } from '../projectiles/Projectile.js';

export class Poison extends Projectile {

    static type = 2;

    constructor(context, x, y) {
        super(context, x, y, Poison.type);

        this.image = new Image();
        this.image.src = '/assets/player-projectile-sprite.png';
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