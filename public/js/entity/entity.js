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
        this.speed = 0.5;

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
        this.id = Date.now();
    }

    nextFrame = () => {
        if(this.canDrawNextFrame) {
            if (this.frameX++ >= this.image.width / this.width - 2) {
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

    damage = amount => {
        if (this.shield - amount >= 0) {
            this.shield -= amount;
        } else
        if (this.health - amount >= 0) {
            this.health -= amount;
        }
    }

    draw() {
        if (this.health > 100) {
            this.health = 100;
        }
        this.healthBar.draw(this.context, this.health);
        this.shieldBar.draw(this.context, this.shield);

    }
};