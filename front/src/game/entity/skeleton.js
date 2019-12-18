import { Entity } from "./entity.js";
import { Fire } from "../projectiles/Fire.js";

export class Skeleton extends Entity {
    constructor(x, y, target, context, id) {
        super(x, y, context, Fire.type);
        this.name = "Skeleton";
        this.id = id;

        this.target = target;

        this.image = new Image();
        this.image.src = '/assets/skeleton-sprite.png';

        this.width = 30;
        this.height = 47;

        this.canShoot = true;
        this.fireRate = 2000;
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;
    }

    shoot() {
        if (this.canShoot && this.target) {
            this.projectiles.push(new Fire(this.context, this.x, this.y));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "red";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};