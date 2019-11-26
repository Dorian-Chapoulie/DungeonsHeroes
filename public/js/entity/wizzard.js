import { Entity } from "/js/entity/entity.js";
import { Frost } from "/js/projectiles/Frost.js";

export class Wizzard extends Entity {
    constructor(name, x, y) {
        super(x, y);
        this.name = name;

        this.image = new Image();
        this.image.src = '/media/wizzard-sprite.png';

        this.projectile = undefined;
        this.canShoot = true;
    }

    shoot(context, entity) {
        if (this.canShoot) {
            this.canShoot = false;
            this.projectile = new Frost(context, this.x + this.width / 2, this.y);
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
        context.fillStyle = "lightblue";
        context.font = "15px Arial";
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
        context.restore();
    }
};