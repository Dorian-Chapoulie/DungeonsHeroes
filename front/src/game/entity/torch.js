import { LightenEntity } from "./lightenEntity.js";
import { sprites, spritesIds } from '../graphics/assets';

export class Torch extends LightenEntity {
    constructor(x, y, context, id) {
        super(x,y, context);    
        
        this.width = 54.6;        
        this.height = 117;
        this.changeRed = true;
        this.brightNessRed = 50;
        this.brightNess = 10;
        this.id = id;

        this.scaleX = 35;
        this.scaleY = 50;

        this.drawTime = 200;

        this.image = sprites[spritesIds.torch];   
        this.healthBar.offsetY = 10;
        this.healthBar.offsetX = this.scaleX;
    } 
    
    onTouch(entity) {         
        entity.health += 0.2;
        this.health -= 0.2;               
    }
};