export class Loot {
    constructor(context, x, y, imageSrc, soundSrc) {
        this.x = x;
        this.y = y;
        this.context = context;  
        
        this.width = 64;
        this.heught = 64;

        this.image = new Image();
        this.image.src = imageSrc;  
        
        this.pickUpSound = document.createElement("audio");
        this.pickUpSound.src = soundSrc;
        this.pickUpSound.setAttribute("preload", "auto");
        this.pickUpSound.setAttribute("controls", "none");
        this.pickUpSound.style.display = "none";
        document.body.appendChild(this.pickUpSound);
        
        this.frameX = 0;
        this.frameY = 0;
    }

    onPickUp = () => {
        this.pickUpSound.play();
    }

    nextFrame = () => {
        if (this.frameX++ >= this.image.width / this.width - 1) {
            this.frameX = 1;
        }
    }
}