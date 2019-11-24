import { Entity } from "/js/entity/entity.js";
import { Poison } from "/js/projectiles/Poison.js";

export class Witch extends Entity {
    constructor(name, x, y) {
        super(x, y);
        this.name = name;

        this.image = new Image();
        this.image.src = '/media/witch-sprite.png';

        this.projectile = undefined;
        this.canShoot = true;
    }

    shoot(context, entity) {
        if (this.canShoot) {
            this.canShoot = false;
            this.projectile = new Poison(context, this.x + this.width / 2, this.y);
            const Ex = entity.x;
            const Ey = entity.y;

            const angleRadians = Math.atan2(Ey - this.y, Ex - this.x);

            this.projectile.dx = Math.cos(angleRadians) * this.speed;
            this.projectile.dy = Math.sin(angleRadians) * this.speed;
        }
    }


    draw = context => {
        super.draw(context);
        if (this.projectile !== undefined) {
            this.projectile.draw();
        }
        context.save();
        context.fillStyle = "red";
        context.font = "15px Arial";
        context.restore();
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
    }
};