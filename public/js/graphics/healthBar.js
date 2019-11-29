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

    draw = (context, health, shield) => {
        context.save();
        context.fillStyle = "red";
        context.fillRect(this.x, this.y - 25, this.maxHealth * 0.64, 7);
        context.fillStyle = "green";
        context.fillRect(this.x, this.y - 25, health * 0.64, 7);
        context.fillStyle = "blue";
        context.fillRect(this.x, this.y - 32, shield * 0.64, 7);

        context.restore();
    }
};