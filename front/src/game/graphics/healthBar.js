export class HealthBar {
    constructor(maxHealth, x, y) {
        this.maxHealth = maxHealth;
        this.x = x;
        this.y = y;
        this.offsetX = 64;
        this.offsetY = 25;
        this.healthColor = "green";
        this.backHealthColor = "red";
    }

    move = (dx, dy) => {
        this.x += dx;
        this.y += dy;
    }

    draw = (context, health) => {
        context.save();
        context.fillStyle = this.backHealthColor;
        context.fillRect(this.x, this.y - this.offsetY, this.offsetX, 7);
        context.fillStyle = this.healthColor;
        context.fillRect(this.x, this.y - this.offsetY, this.offsetX / (this.maxHealth / health), 7);
        context.restore();
    }
};