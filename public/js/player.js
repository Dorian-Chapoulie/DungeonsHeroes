import { HealthBar } from "/js/healthBar.js";

export class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 64;
        this.height = 64;
        this.dx = 0;
        this.dy = 0;
        this.speed = 5;
        this.image = new Image();
        this.image.src = '/media/player-sprite.png'
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

    move = () => {
        this.x += this.dx;
        this.y += this.dy;
        this.healthBar.move(this.dx, this.dy);
    }

    damage = amount => {
        if (this.health - amount > 0)
            this.health -= amount;
        else
            this.health = 0;

        this.healthBar.health = this.health;
    }

    draw = context => {
        context.font = "15px Arial";
        context.fillText(this.name, this.x + context.measureText(this.name).width / 4, this.y);
        this.healthBar.draw(context);
    }
};