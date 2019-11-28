import { Projectile } from '/js/projectiles/Projectile.js';

export class Fire extends Projectile {
    constructor(context, x, y) {
        super(context, x, y);
        
        this.damageValue = 20;
        //TO-DO adding damage over time
    }

    onHit(entity) {
        super.onHit(entity); 
    }

    draw() {        
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.fillStyle = "black";
        this.context.beginPath();
        this.context.arc(0, 0, 2, 0, 2 * Math.PI);
        this.context.fill();
        this.context.restore();
    }
}