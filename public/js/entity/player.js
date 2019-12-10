import { Entity } from "/js/entity/entity.js";
import { PlayerProjectile } from "/js/projectiles/Playerprojectile.js";

export class Player extends Entity {
    constructor(name, x, y, id, context) {
        super(x, y, context);
        this.name = name;

        this.canMoveUp = true;
        this.canMoveDown = true;
        this.canMoveRight = true;
        this.canMoveLeft = true;

        this.socketId = id;

        this.image = new Image();
        this.image.src = '/media/player-sprite.png'
        this.canShoot = true;
        this.isSilenced = false;
        this.target = undefined;
        this.speed = 2;
        this.AVANCER = 0;
        this.GAUCHE = 1;
        this.RECULER = 3;
        this.DROIT = 2;

        this.shield = 100;
        this.health = 500;
    }

    shoot = () => {
        if (this.canShoot && this.target && !this.isSilenced) {            
            this.projectile = new PlayerProjectile(this.context, this.x, this.y);
            super.shoot();
        }
    }

    move(time) {
        super.move(time);
        if (this.projectile && this.target) {
            this.projectile.move();
        }
    }

    draw = () => {
        super.draw();
        if (this.target && this.projectile) {
            this.projectile.draw();
        }
        this.context.save();
        this.context.fillStyle = "white";
        this.context.font = "20px Arial";
        this.context.fillText(this.name, this.x + this.context.measureText(this.name).width / 4, this.y);
        this.context.restore();
    }
};