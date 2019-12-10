import { Projectile } from '/js/projectiles/Projectile.js';

export class Poison extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 2);

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 64;
        this.height = 64;


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