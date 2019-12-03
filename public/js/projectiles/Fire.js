import { Projectile } from '/js/projectiles/Projectile.js';

export class Fire extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 0);

        this.damageValue = 1;
        this.dotTime = 3000;
    }

    onHit(entity) {
        if (entity.canAffect) {
            entity.canAffect = false;
            const interval = setInterval(() => {
                super.onHit(entity);
            }, 100);
            setTimeout(() => {
                entity.canAffect = true;
                clearInterval(interval);
            }, this.dotTime);

        }
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "orange";
        this.context.beginPath();
        this.context.arc(0, 0, 5, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }
}