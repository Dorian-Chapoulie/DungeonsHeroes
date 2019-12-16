import { Entity } from "/js/entity/entity.js";
import { Poison } from "/js/projectiles/Poison.js";

export class Witch extends Entity {
    constructor(x, y, target, context, id) {
        super(x, y, context, Poison.type);
        this.name = "Witch";
        this.id = id;

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/witch-sprite.png';
        this.canShoot = true;   
        this.fireRate = 2000;
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;

        this.width = 34;
        this.height = 56;
    }

    shoot() {
        if (this.canShoot && this.target) {
            this.projectiles.push(new Poison(this.context, this.x, this.y));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = 'rgb(230, 45, 240)';
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};