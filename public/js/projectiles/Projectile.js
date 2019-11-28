export class Projectile {
    constructor(context, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;        
        this.dx = 1;
        this.dy = 1;
        this.context = context;                        
    }

    onHit(entity) {
        entity.damage(this.damageValue);
    }

    move = () => {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}