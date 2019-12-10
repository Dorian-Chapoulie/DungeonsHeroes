import { HealthBar } from "/js/graphics/healthBar.js";
import { ShieldBar } from "/js/graphics/shieldBar.js";

export class Entity {
    constructor(x, y, context) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.scaleX = 64;
        this.scaleY = 64;
        this.dx = 0;
        this.dy = 0;
        this.speed = 1;

        this.frameX = 0;
        this.frameY = 0;

        this.context = context;

        this.canAffect = true;

        this.health = 100;
        this.shield = 0;
        this.healthBar = new HealthBar(this.health, this.x, this.y);
        this.shieldBar = new ShieldBar(this.shield, this.x, this.y);
        this.canDrawNextFrame = true;
        this.drawTime = 100;
        this.shootId = 0;
    }

    shoot() {
        this.shootId++;
        this.canShoot = false;        
        const Ex = this.target.x + this.target.scaleX / 2;
        const Ey = this.target.y + this.target.scaleY / 2;

        const angleRadians = Math.atan2(Ey - (this.y + this.scaleY / 2), Ex - (this.x + this.scaleX / 2));

        this.projectile.dx = Math.cos(angleRadians) * this.projectile.speed;
        this.projectile.dy = Math.sin(angleRadians) * this.projectile.speed;
    }

    nextFrame() {
        if (this.canDrawNextFrame) {
            if (this.frameX++ > this.image.width / this.width - 2) {
                this.frameX = 0;
            }
            this.canDrawNextFrame = false;
            setTimeout(() => {
                this.canDrawNextFrame = true;
            }, this.drawTime);
        }
    }

    move(time) {
        this.x += (this.dx * this.speed * time);
        this.y += (this.dy * this.speed * time);
        this.healthBar.move(this.dx * this.speed * time, this.dy * this.speed * time);
        this.shieldBar.move(this.dx * this.speed * time, this.dy * this.speed * time);
    }

    damage(amount) {
        if (this.shield - amount >= 0) {
            this.shield -= amount;
        } else if (this.health - amount >= 0) {
            this.shield = 0;
            const temp = this.shield - amount;
            this.health -= -temp;
        } else {
            this.shield = 0;
            this.health = 0;
        }
    }

    draw() {
        if (this.health > 100) {
            this.health = 100;
        }
        this.healthBar.draw(this.context, this.health);
        this.shieldBar.draw(this.context, this.shield);
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
};