import { Entity } from "./entity.js";
import { PlayerProjectile } from "../projectiles/Playerprojectile.js";
import { getPlayerSkinFromId, sounds, soundsIds } from '../graphics/assets';

export class Player extends Entity {
    constructor(name, x, y, id, context, skinId) {
        super(x, y, context, PlayerProjectile.type);
        this.name = name;

        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;

        this.socketId = id;
        this.skinId = skinId;
        this.image = getPlayerSkinFromId(skinId);
        this.canShoot = true;
        this.isSilenced = false;
        this.target = undefined;
        this.speed = 2;

        this.width = 32;    
        this.AVANCER = 1;
        this.GAUCHE = 2;
        this.RECULER = 0;
        this.DROIT = 3;

        this.shield = 50;
        this.health = 100;
        this.maxHealth = 100;
        
        this.damageCoef = 1;
        this.coin = 0;
        this.ulti = 100;

        this.hitSound = sounds[soundsIds.playerDamage];        
        this.canPlayHitSound = true;
    }

    shoot = () => {
        if (this.canShoot && this.target && !this.isSilenced) {
            this.projectiles.push(new PlayerProjectile(this.context, this.x + this.scaleX / 2, this.y + this.scaleY / 2, this.damageCoef));
            super.shoot();
        }
    }

    incrementUlti(value) { 
        if(this.ulti < 100) { 
            this.ulti += value; 
        } 
    } 

    damage(amount) {
        if (this.canPlayHitSound) {
            this.canPlayHitSound = false;
            this.hitSound.play();
            setTimeout(() => {
                this.canPlayHitSound = true;
            }, 1000);
        }
        super.damage(amount);
    }

    draw = () => {
        super.draw();
        this.context.save();
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(this.name, this.x + (this.scaleX / 2) - this.context.measureText(this.name).width / 2, this.y);
        this.context.restore();
    }
};