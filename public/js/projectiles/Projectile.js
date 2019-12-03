export class Projectile {
    constructor(context, x, y, type) {
        this.x = x;
        this.y = y;
        this.speed = 2;        
        this.dx = 1;
        this.dy = 1;
        this.context = context;      
        this.type = type;                  
    }

    onHit(entity) {
        entity.damage(this.damageValue);
    }

    move = () => {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}