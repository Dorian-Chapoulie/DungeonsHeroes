import { HealthBar } from "/js/graphics/healthBar.js";
import { Heart } from "/js/loot/heart.js";
import { Coin } from "/js/loot/coin.js";

export class Entity {
    constructor(x, y, context) {
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

        this.context = context;

        this.loots = [
            0, //heart
            1, //coin
        ];

        this.health = 100;
        this.healthBar = new HealthBar(this.health, this.x, this.y);
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getLoots() {      
        const ret = [];
        for(let i = 0; i < this.getRandomInt(5) + 1; i++) {
            switch(this.getRandomInt(this.loots.length)) {
                case 0:
                    ret.push(new Heart(this.context, this.x + i * 64, this.y));
                break;
                case 1:
                    ret.push(new Coin(this.context, this.x + i * 64, this.y));
                break;
            }
        }
        return ret;
    }
    
    move(time) {
        this.x += (this.dx * this.speed * time);
        this.y += (this.dy * this.speed * time);
        this.healthBar.move(this.dx * this.speed * time, this.dy * this.speed * time);
    }

    damage = amount => {
        if (this.health - amount > 0)
            this.health -= amount;
        else
            this.health = 0;        
    }

    draw() {
        if(this.health > 100) {
            this.health = 100;
        }
        this.healthBar.draw(this.context, this.health);
    }
};