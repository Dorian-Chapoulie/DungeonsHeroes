import { HealthBar } from "/js/graphics/healthBar.js";

export class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.dx = 0;
        this.dy = 0;
        this.speed = 1;

        this.frameX = 0;
        this.frameY = 0;


        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;

        this.health = 100;
        this.healthBar = new HealthBar(this.health, this.health, this.x, this.y);
    }

    nextFrame = () => {
        if (this.frameY <= 1) {
            if (this.frameX++ >= 9) {
                this.frameX = 1;
            }
        } else if (this.frameY == 2) {
            this.frameX = 0;
        } else if (this.frameY == 3) {
            if (this.frameX++ >= 4) {
                this.frameX = 1;
            }
        }
    }
    
    move = (time) => {
        this.x += (this.dx * time);
        this.y += (this.dy * time);
        this.healthBar.move(this.dx * time, this.dy * time);
    }

    damage = amount => {
        if (this.health - amount > 0)
            this.health -= amount;
        else
            this.health = 0;

        this.healthBar.health = this.health;
    }

    shoot(context, entity) {}

    draw(context) {
        this.healthBar.draw(context);
    }
};