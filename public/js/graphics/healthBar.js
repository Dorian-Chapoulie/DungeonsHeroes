export class HealthBar {
    constructor(maxHealth, health, x, y) {
        this.maxHealth = maxHealth;
        this.health = health;      
        this.x = x;
        this.y = y;
    }

    move = (dx, dy) => {
        this.x += dx;
        this.y += dy;
    }

    draw = (context) => {               
        context.save();
        context.fillStyle = "red"; 
        context.fillRect(this.x, this.y - 25, this.maxHealth * 0.64, 7);
        context.fillStyle = "green";         
        context.fillRect(this.x, this.y - 25, this.health * 0.64, 7);        
        context.restore();
    }
};