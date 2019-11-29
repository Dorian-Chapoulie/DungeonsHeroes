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

        this.context = context;

        this.loots = [
            0, //heart
            1, //coin
        ];

        this.canAffect = true;

        this.health = 100;
        this.shield = 0;
        this.healthBar = new HealthBar(this.health, this.x, this.y);
    }

    nextFrame = () => {
        if (this.frameX++ >= this.image.width / this.width - 1) {
            this.frameX = 1;
        }
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getLoots() {
        const ret = [];
        for (let i = 0; i < this.getRandomInt(5) + 1; i++) {
            switch (this.getRandomInt(this.loots.length)) {
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
        this.healthBar.draw(this.context, this.health, this.shield);
    }
};