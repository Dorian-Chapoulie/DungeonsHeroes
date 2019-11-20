export class Fire {
    constructor(context, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;        
        this.dx = 0;
        this.dy = 0;
        this.context = context;
        this.damageValue = 3;
    }

    draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "black";
        this.context.beginPath();
        this.context.arc(0, 0, 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }


    move = () => {
        this.x += this.dx;
        this.y += this.dy;
    }
}