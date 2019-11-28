export class Loot {
    constructor(context, x, y, imageSrc) {
        this.x = x;
        this.y = y;
        this.context = context;  
        
        this.width = 64;
        this.heught = 64;

        this.image = new Image();
        this.image.src = imageSrc;  
        
        this.frameX = 0;
        this.frameY = 0;
    }

    nextFrame = () => {
        if (this.frameX++ >= this.image.width / this.width - 1) {
            this.frameX = 1;
        }
    }
}