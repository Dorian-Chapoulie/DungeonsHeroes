import { Entity } from "./entity.js";
import { Frost } from "../projectiles/Frost.js";

export class Wizzard extends Entity {
    constructor(x, y, target, context, id) {
        super(x, y, context, Frost.type);
        this.name = "Wizzard";
        this.id = id;

        this.target = target;

        this.image = new Image();
        this.image.src = '/media/wizzard-sprite.png';
        
        this.canShoot = true;
        this.fireRate = 1800;
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;

        this.width = 29;
        this.height = 35;
    }

    shoot() {
        if (this.canShoot && this.target) {
            this.projectiles.push(new Frost(this.context, this.x, this.y));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "lightblue";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + 6, this.y);
        this.context.restore();
    }
};