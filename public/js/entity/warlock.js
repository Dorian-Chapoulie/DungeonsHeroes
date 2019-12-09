import { Entity } from "/js/entity/entity.js";
import { Silence } from "/js/projectiles/Silence.js";

export class Warlock extends Entity {
    constructor(x, y, target, context, id) {
        super(x,y, context);
        this.name = "Warlock";
        this.id = id;

        this.target = target;

        this.width = 140;        
        this.height = 112;
        //this.scaleX = 64 * 2;
        //this.scaleY = 64 * 2;

        this.image = new Image();
        this.image.src = '/media/warlock-sprite.png';
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
            this.projectile = new Silence(this.context, this.x + this.scaleX / 2, this.y + this.scaleY / 2);
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
        this.context.fillStyle = "rgb(217, 158, 48)";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};