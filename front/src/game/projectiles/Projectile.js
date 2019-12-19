import { drawEntityAnimation } from '../graphics/graphics.js';
export class Projectile {
    constructor(context, x, y, type) {
        this.x = x;
        this.y = y;
        this.speed = 2;        
        this.dx = 1;
        this.dy = 1;
        this.context = context;      
        this.type = type;                   
      
        this.frameX = 0;
        this.frameY = 0;
        this.scaleX = 32;
        this.scaleY = 32;

        this.drawTime = 50;
        this.canDrawNextFrame = true;
    }

    onHit(entity) {        
        entity.damage(this.damageValue);
    }

    draw() {
        drawEntityAnimation(this);
        /*this.context.beginPath();
        this.context.strokeStyle = "#FF0000";
        this.context.moveTo(this.x, this.y);
        this.context.lineTo(this.x + this.scaleX, this.y);

        this.context.lineTo(this.x + this.scaleX, this.y + this.scaleY);

        this.context.moveTo(this.x + this.scaleY, this.y + this.scaleY);
        this.context.lineTo(this.x, this.y + this.scaleY);
        this.context.lineTo(this.x, this.y);

        this.context.stroke();*/
    }

    nextFrame = () => {
        if (this.canDrawNextFrame) {
            if (this.frameX++ >= this.image.width / this.width - 2) {
                this.frameX = 0;
            }
            this.canDrawNextFrame = false;
            setTimeout(() => {
                this.canDrawNextFrame = true;
            }, this.drawTime);
        }
    }


    move = () => {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}