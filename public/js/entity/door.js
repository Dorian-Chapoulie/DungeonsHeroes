import { Entity } from "/js/entity/entity.js";

export class Door extends Entity {
    constructor(x, y, context) {
        super(280,0, context);
        
        this.width = 58;        
        this.height = 63;

        this.scaleX = 64;
        this.scaleY = 64;

        this.drawTime = 200;
        this.canOpen = false;

        this.image = new Image();
        this.image.src = '/media/door-sprite.png';   
        this.drawTime = 60;
    }
    
    nextFrame() {
        if(this.canOpen && this.frameX * this.width <= 58 * 2) {
            super.nextFrame();
        }
    }
};