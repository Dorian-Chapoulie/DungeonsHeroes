import { Entity } from "/js/entity/entity.js";
import { Fire } from "/js/projectiles/Fire.js";

export class Skeleton extends Entity {
    constructor(x, y, target, context, id) {
        super(x,y, context);
        this.name = "Skeleton";
        this.id = id;

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/skeleton-sprite.png';
        this.canShoot = true;     
        this.projectile = undefined;       
        
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;
    }
    
    shoot() {        
        if(this.canShoot && this.target) {     
            super.shoot();              
            this.canShoot = false;
            this.projectile = new Fire(this.context, this.x, this.y);
            const Ex = this.target.x + this.target.scaleX / 2;
            const Ey = this.target.y + this.target.scaleY / 2;

            const angleRadians = Math.atan2(Ey - (this.y + this.scaleY / 2), Ex - (this.x + this.scaleX / 2));

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
        this.context.fillStyle = "red";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};