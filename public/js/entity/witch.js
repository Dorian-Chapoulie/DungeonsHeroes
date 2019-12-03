import { Entity } from "/js/entity/entity.js";
import { Poison } from "/js/projectiles/Poison.js";

export class Witch extends Entity {
    constructor(x, y, target, context) {
        super(x, y, context);
        this.name = "Witch";

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/witch-sprite.png';

        this.projectile = undefined;
        this.canShoot = true;   
        
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;
    }

    shoot() {
        if (this.canShoot && this.target) {
            this.canShoot = false;
            this.projectile = new Poison(this.context, this.x + this.width / 2, this.y);
            const Ex = this.target.x;
            const Ey = this.target.y;

            const angleRadians = Math.atan2(Ey - this.y, Ex - this.x);

            this.projectile.dx = Math.cos(angleRadians) * this.projectile.speed;
            this.projectile.dy = Math.sin(angleRadians) * this.projectile.speed;
        }
    }

    draw = () => {
        super.draw();
        if (this.projectile !== undefined) {
            this.projectile.draw();
        }
        this.context.save();
        this.context.fillStyle = 'rgb(230, 45, 240)';
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};