import { HealthBar } from "/js/healthBar.js";

export class Player {
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = 0;
        this.speed = 5;
        this.image = new Image();
        this.image.src = '/media/player-sprite.png'
        this.frame = 0;
        this.frameY = 0;

        this.DROIT = 0;
        this.GAUCHE = 1;
        this.RECULER = 2;
        this.AVANCER = 3;     
        
        this.health = 100;
        this.healthBar = new HealthBar(this.health, this.health, this.x, this.y);
    }

    nextFrame = () => {
        if(this.frameY <= 1) {
            if(this.frame++ >= 9) {
                this.frame = 1;
            }           
        }else if(this.frameY == 2) {
            this.frame = 0;
        }
        else if(this.frameY == 3) {
            if(this.frame++ >= 4) {
                this.frame = 1;
            } 
        }
    }
    
    move = (time) => {
        this.x += (this.dx * time);
        this.y += (this.dy * time);
        this.healthBar.move(this.dx * time, this.dy * time);
    }

    damage = amount => {
        if(this.health - amount > 0)
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