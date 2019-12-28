import { LightenEntity } from "./lightenEntity.js";
import { sprites, spritesIds } from '../graphics/assets';

export class Chest extends LightenEntity {
    constructor(x, y, context, id) {
        super(x, y, context);    
        
        this.width = 37;        
        this.height = 38;
        this.id = id;
        this.canProcessLight = true;
        this.name = "Chest";

        this.changeGreen = true;
        this.changeRed = true;

        this.brightNessRed = 10;
        this.brightNessGreen = 10;
        this.nbCouches = 1;

        this.scaleX = 64;
        this.scaleY = 64;

        this.drawTime = 150;

        this.image = sprites[spritesIds.chest];   
    }    
};