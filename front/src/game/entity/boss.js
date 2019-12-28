import { Entity } from "./entity.js";
import { Fire } from "../projectiles/Fire.js";
import { playSound } from '../entity/entity';
import { sprites, spritesIds } from '../graphics/assets';

const getRandomInt = max => {
    return Math.floor(Math.random() * Math.floor(max));
}

export class Boss extends Entity {
    constructor(x, y, targets, context, id) {
        super(x, y, context, Fire.type);
        this.name = "Sahrotaar";
        this.id = id;

        this.targets = targets;

        this.image = sprites[spritesIds.boss];

        this.width = 96;
        this.height = 96;
        this.scaleX = 96;
        this.scaleY = 96;

        this.health = 1000;
        this.maxHealth = 1000;
        this.healthBar.maxHealth = 1000;
        this.healthBar.offsetX = this.scaleX;
        this.healthBar.healthColor = "purple";
        this.healthBar.backHealthColor = "black";

        this.canShoot = true;
        this.fireRate = 700;
        this.DROIT = 2;
        this.GAUCHE = 1;
        this.RECULER = 0;
        this.AVANCER = 3;

        this.phase = 1;
    }

    shoot() {
        if (this.canShoot && this.targets.length > 0) {                        

            playSound(this.projectilesType);
            this.shootId++;
            this.canShoot = false; 
          
            if(this.targets[0] !== undefined) { 
                this.target = this.targets[0];
                for(let i = 0; i < this.phase; i++) {
                    this.projectiles.push(new Fire(this.context, this.x, this.y));   
                    this.projectiles[this.projectiles.length - 1].damageValue = 20;                    
                    super.shoot();
                }
            }
            if(this.targets[1] !== undefined) {  
                this.target = this.targets[1];
                for(let i = 0; i < this.phase; i++) {
                    this.projectiles.push(new Fire(this.context, this.x, this.y));
                    this.projectiles[this.projectiles.length - 1].damageValue = 20;                       
                    super.shoot();
                }
            }
            setTimeout(() => {
                this.canShoot = true;
            }, this.fireRate);
        }
    }

    damage(amount) {
        super.damage(amount);
        
        if(this.health <= this.maxHealth / 2 && this.phase === 1) {
            this.phase++;
            this.fireRate -= 150;
        }

        if(this.health <= this.maxHealth / 3 && this.phase === 2) {
            this.phase++;
            this.fireRate -= 150;
        }

        if(this.health <= this.maxHealth / 4 && this.phase === 3) {
            this.phase++;
            this.fireRate -= 150;
        }
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "orange";
        this.context.font = "15px Arial";
        this.context.fillText(this.name + " " + this.health, this.x + (this.scaleX / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
    }
};