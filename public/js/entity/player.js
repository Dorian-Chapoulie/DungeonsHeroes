import { Entity } from "/js/entity.js";

export class Player extends Entity {
    constructor(name, x, y, id) {
        super(x,y);
        this.id = id;
        this.name = name;

        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;

        this.image = new Image();
        this.image.src = '/media/player-sprite.png'
    }
    

    draw = context => {
        super.draw(context);
        context.font = "15px Arial";
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
    }
};