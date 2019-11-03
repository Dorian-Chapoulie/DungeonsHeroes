export class Fire {
    constructor(context, x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.dx = Math.sin(angle) * speed;
        this.dy = -Math.cos(angle) * speed;
        this.context = context;

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