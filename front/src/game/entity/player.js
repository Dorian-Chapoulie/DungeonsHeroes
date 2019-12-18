import { Entity } from "./entity.js";
import { PlayerProjectile } from "../projectiles/Playerprojectile.js";

export class Player extends Entity {
    constructor(name, x, y, id, context) {
        super(x, y, context, PlayerProjectile.type);
        this.name = name;

        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;

        this.socketId = id;

        this.image = new Image();
        this.image.src = '/assets/player-sprite.png'
        this.canShoot = true;
        this.isSilenced = false;
        this.target = undefined;
        this.speed = 2;
        this.AVANCER = 0;
        this.GAUCHE = 1;
        this.RECULER = 3;
        this.DROIT = 2;

        this.shield = 50;
        this.health = 100;
        this.maxHealth = 100;
        
        this.damageCoef = 1;

        this.hitSound = new Audio();
        this.hitSound.src = '/assets/sound/player-damage.mp3';
        this.hitSound.volume = 0.6;
        this.canPlayHitSound = true;
    }

    shoot = () => {
        if (this.canShoot && this.target && !this.isSilenced) {
            this.projectiles.push(new PlayerProjectile(this.context, this.x + this.scaleX / 2, this.y + this.scaleY / 2, this.damageCoef));
            super.shoot();
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
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};