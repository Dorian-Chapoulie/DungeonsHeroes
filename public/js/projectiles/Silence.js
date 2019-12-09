import { Projectile } from '/js/projectiles/Projectile.js';

export class Silence extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 3, '/media/sound/coin.mp3');

        this.image = new Image();
        this.image.src = '/media/player-projectile-sprite.png';
        this.width = 64;
        this.height = 64;

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