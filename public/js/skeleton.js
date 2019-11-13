import { Entity } from "/js/entity.js";

export class Skeleton extends Entity {
    constructor(name, x, y) {
        super(x,y);
        this.name = name;

        this.image = new Image();
        this.image.src = '/media/skeleton-sprite.png';
    }
    

    draw = context => {
        super.draw(context);        
        context.save();
        context.fillStyle = "red"; 
        context.font = "15px Arial";
        context.restore();
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
    }
};