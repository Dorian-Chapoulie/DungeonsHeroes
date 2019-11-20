import { Projectile } from '/js/projectiles/Projectile.js';

export class Frost extends Projectile {
    constructor(context, x, y) {
        super(context, x, y);
       
        this.damageValue = 5;
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "blue";
        this.context.beginPath();
        this.context.arc(0, 0, 10, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }

    onHit(entity) {
        super.onHit(entity);
        const temp = entity.speed;
        entity.speed = 1;
        setTimeout(() => {
            entity.speed = temp;
        }, 2000);
    }

    move = () => {
        this.x += this.dx;
        this.y += this.dy;
    }
}