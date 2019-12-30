import { Entity } from "./entity.js";
import { Poison } from "../projectiles/Poison.js";
import { sprites, spritesIds } from '../graphics/assets';

export class Witch extends Entity {
    constructor(x, y, target, context, id) {
        super(x, y, context, Poison.type);
        this.name = "Witch";
        this.id = id;

        this.target = target;

        this.image = sprites[spritesIds.witch];
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
            this.projectiles.push(new Poison(this.context, this.x + this.width / 2, this.y + this.height));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = 'rgb(230, 45, 240)';
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + (this.scaleX / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
    }
};