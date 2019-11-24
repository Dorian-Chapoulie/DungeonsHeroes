import { Projectile } from '/js/projectiles/Projectile.js';

export class Poison extends Projectile {
    constructor(context, x, y) {
        super(context, x, y);

        this.damageValue = 0;
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "green";
        this.context.beginPath();
        this.context.arc(0, 0, 10, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }

    onHit(entity) {
        super.onHit(entity);
        const temp = entity.speed;
        entity.speed = 0;
        setTimeout(() => {
            entity.speed = temp;
        }, 900);
    }

    move = () => {
        this.x += this.dx;
        this.y += this.dy;
    }
}