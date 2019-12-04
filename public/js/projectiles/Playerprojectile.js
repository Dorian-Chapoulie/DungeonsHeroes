import { Projectile } from '/js/projectiles/Projectile.js';

export class PlayerProjectile extends Projectile {
    constructor(context, x, y) {
        super(context, x, y, 1);

        this.damageValue = 15;
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "red";
        this.context.beginPath();
        this.context.arc(0, 0, 5, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }

    onHit(entity) {
        super.onHit(entity);

    }
}