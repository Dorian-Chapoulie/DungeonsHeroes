import { Entity } from "./entity.js";
import { Silence } from "../projectiles/Silence.js";
import { sprites, spritesIds } from '../graphics/assets';

export class Warlock extends Entity {
    constructor(x, y, target, context, id) {
        super(x,y, context, Silence.type);
        this.name = "Warlock";
        this.id = id;

        this.target = target;

        this.width = 140;        
        this.height = 112;

        this.image = sprites[spritesIds.warlock];
        this.canShoot = true;    
        this.fireRate = 3000;       
        
        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;
    }
    
    shoot() {        
        if(this.canShoot && this.target) {     
            this.projectiles.push(new Silence(this.context, this.x, this.y));
            super.shoot();
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "rgb(217, 158, 48)";
        this.context.font = "15px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};