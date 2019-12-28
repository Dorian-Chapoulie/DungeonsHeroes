import { Entity } from "./entity.js";
import { Frost } from "../projectiles/Frost.js";
import { sprites, spritesIds } from '../graphics/assets';

export class Wizzard extends Entity {
    constructor(x, y, target, context, id) {
        super(x, y, context, Frost.type);
        this.name = "Wizzard";
        this.id = id;

        this.target = target;

        this.image = sprites[spritesIds.wizzard];
        
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
            this.projectiles.push(new Frost(this.context, this.x + this.width, this.y));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "lightblue";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + (this.scaleX / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
    }
};