export class HealthBar {
    constructor(maxHealth, x, y) {
        this.maxHealth = maxHealth;
        this.x = x;
        this.y = y;
    }

    move = (dx, dy) => {
        this.x += dx;
        this.y += dy;
    }

    draw = (context, health) => {
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.x, this.y - 25, 64, 7);
        context.fillStyle = "green";
        context.fillRect(this.x, this.y - 25, 64 / (this.maxHealth / health), 7);
        context.restore();
    }
};