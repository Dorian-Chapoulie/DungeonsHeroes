import { Projectile } from '/js/projectiles/Projectile.js';

export class Silence extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 3);

        this.damageValue = 1;
        this.speed = 1;
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "purple";
        this.context.beginPath();
        this.context.arc(0, 0, 8, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
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