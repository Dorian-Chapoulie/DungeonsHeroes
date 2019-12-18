export class ShieldBar {
    constructor(maxShield, x, y) {
        this.maxShield = maxShield;
        this.x = x;
        this.y = y;
    }

    move = (dx, dy) => {
        this.x += dx;
        this.y += dy;
    }

    draw = (context, shield) => {
        context.save();
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y - 32, shield * 0.64, 7);
        context.restore();
    }
};