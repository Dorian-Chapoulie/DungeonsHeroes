import { Entity, playSound } from "./entity.js";

export class Door extends Entity {
    constructor(x, y, context) {
        super(x, y, context);
        
        this.width = 58;        
        this.height = 63;

        this.scaleX = 64;
        this.scaleY = 64;

        this.drawTime = 200;
        this.canOpen = false;

        this.image = new Image();
        this.image.src = '/assets/door-sprite.png';   
        this.drawTime = 60;
        this.soundId = 5;
        this.maxFrameY = 2;
    }

    open() {
        this.canOpen = true;
        playSound(this.soundId);
    }

    close() {
        this.canOpen = false;
        this.frameX = 0;
        if(this.frameY++ == this.maxFrameY) {
            this.frameY = 0;
        }        
    }
    
    nextFrame() {
        if(this.canOpen && this.frameX * this.width <= 58 * 2) {
            super.nextFrame();
        }
    }
};