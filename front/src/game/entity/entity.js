import { HealthBar } from "../graphics/healthBar.js";
import { ShieldBar } from "../graphics/shieldBar.js";
import { sounds, soundsIds } from '../graphics/assets';

export const playSound = type => {        
    switch(type) {
        case 0: //Fire        
        sounds[soundsIds.fireball].volume = 0.4;
        sounds[soundsIds.fireball].currentTime = 0;
        sounds[soundsIds.fireball].play(); 
            break;
        case 1: //Frost        
        sounds[soundsIds.ice].volume = 0.8;
        sounds[soundsIds.ice].currentTime = 0;
        sounds[soundsIds.ice].play();
            break;
        case 2: //Poison        
        sounds[soundsIds.poison].volume = 0.4;
        sounds[soundsIds.poison].currentTime = 0;
        sounds[soundsIds.poison].play(); 
            break;
        case 3: //Silence        
        sounds[soundsIds.silence].volume = 1;
        sounds[soundsIds.silence].currentTime = 0;
        sounds[soundsIds.silence].play(); 
            break;
        case 4: //Player        
        sounds[soundsIds.player].volume = 0.8;
        sounds[soundsIds.player].currentTime = 0;
        sounds[soundsIds.player].play();
            break;
        case 5://door
            sounds[soundsIds.door].play();
        break;
    };
}

export class Entity {
    constructor(x, y, context, projectilesType) {
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
        this.maxHealth = 100;
        this.shield = 0;

        this.healthBar = new HealthBar(this.health, this.x, this.y);
        this.shieldBar = new ShieldBar(this.shield, this.x, this.y);
        this.canDrawNextFrame = true;
        this.drawTime = 100;
        this.shootId = 0;
        this.fireRate = 1500;
        this.projectiles = [];
        this.projectilesType = projectilesType;
    }

    shoot() {
        playSound(this.projectilesType);
        this.shootId++;
        this.canShoot = false;        
        const Ex = this.target.x + this.target.scaleX / 2;
        const Ey = this.target.y + this.target.scaleY / 2;

        const angleRadians = Math.atan2(Ey - (this.y + this.scaleY / 2), Ex - (this.x + this.scaleX / 2));

        this.projectiles[this.projectiles.length - 1].dx = Math.cos(angleRadians) * this.projectiles[this.projectiles.length - 1].speed;
        this.projectiles[this.projectiles.length - 1].dy = Math.sin(angleRadians) * this.projectiles[this.projectiles.length - 1].speed;
        setTimeout(() => {
            this.canShoot = true;
        }, this.fireRate);
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

        if (this.projectiles.length > 0 && this.target) {
            this.projectiles.forEach(p => {
                if(p)
                    p.move();
            });            
        }
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
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
        this.healthBar.draw(this.context, this.health);
        this.shieldBar.draw(this.context, this.shield);
        if (this.target && this.projectiles.length > 0) {
            this.projectiles.forEach(p => {
                if(p)
                    p.draw();
            });            
        }
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