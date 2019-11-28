import { Entity } from "/js/entity/entity.js";
import { Frost } from "/js/projectiles/Frost.js";

export class Wizzard extends Entity {
    constructor(name, x, y, target, context) {
        super(x,y, context);
        this.name = name;

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/wizzard-sprite.png';

        this.projectile = undefined;
        this.canShoot = true;
    }
    
    shoot() {        
        if(this.canShoot && this.target) {
            this.canShoot = false;
            this.projectile = new Frost(this.context, this.x + this.width / 2, this.y);
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
        this.context.fillStyle = "lightblue";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};