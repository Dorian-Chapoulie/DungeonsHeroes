import { HealthBar } from "/js/graphics/healthBar.js";
import { ShieldBar } from "/js/graphics/shieldBar.js";

const hitSoundFire = new Audio();        
const hitSoundFrost = new Audio();        
const hitSoundPlayerProjectile = new Audio();        
const hitSoundPoison = new Audio();        
const hitSoundSilence = new Audio();
const soundDoor = new Audio();        

(function initSounds(){    
    hitSoundFire.src = '/media/sound/fireball-cast.mp3';
    hitSoundFrost.src = '/media/sound/ice-cast.mp3';
    hitSoundPlayerProjectile.src = '/media/sound/player-cast.mp3';
    hitSoundPoison.src = '/media/sound/poison-cast.mp3';
    hitSoundSilence.src = '/media/sound/silence-cast.mp3';
    soundDoor.src = '/media/sound/door.mp3';
})();

export const playSound = type => {        
    switch(type) {
        case 0: //Fire        
        hitSoundFire.volume = 0.4;
        hitSoundFire.currentTime = 0;
        hitSoundFire.play();    
            break;
        case 1: //Frost        
        hitSoundFrost.volume = 0.8;
        hitSoundFrost.currentTime = 0;
        hitSoundFrost.play();    
            break;
        case 2: //Poison        
        hitSoundPoison.volume = 0.4;
        hitSoundPoison.currentTime = 0;
        hitSoundPoison.play();    
            break;
        case 3: //Silence        
        hitSoundSilence.volume = 1;
        hitSoundSilence.currentTime = 0;
        hitSoundSilence.play();    
            break;
        case 4: //Player        
        hitSoundPlayerProjectile.volume = 0.8;
        hitSoundPlayerProjectile.currentTime = 0;
        hitSoundPlayerProjectile.play();
            break;
        case 5:
        soundDoor.play();
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