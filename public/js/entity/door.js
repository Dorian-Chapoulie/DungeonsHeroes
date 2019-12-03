import { Entity } from "/js/entity/entity.js";

export class Torch extends Entity {
    constructor(x, y, context) {
        super(x,y, context);
        
        this.width = 54.6;        
        this.height = 117;

        this.scaleX = 35;
        this.scaleY = 50;

        this.drawTime = 200;

        this.image = new Image();
        this.image.src = '/media/torch-sprite.png';   
    }    
};