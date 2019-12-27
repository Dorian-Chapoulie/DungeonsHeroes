export class Loot {
    constructor(context, x, y, id) {
        this.x = x;
        this.y = y;
        this.context = context;      
        this.id = id;
        
        this.frameX = 0;
        this.frameY = 0;

        this.canDrawNextFrame = true;
        this.drawTime = 500;
    }

    onPickUp() {        
        this.pickUpSound.play();
    }

    nextFrame = () => {
        if(this.canDrawNextFrame) {            
            if (this.frameX++ >= this.image.width / this.width - 2) {
                this.frameX = 0;
            }
            this.canDrawNextFrame = false;
            setTimeout(() => {
                this.canDrawNextFrame = true;
            }, this.drawTime);
        }
    }
}