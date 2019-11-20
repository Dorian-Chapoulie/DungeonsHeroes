export class Projectile {
    constructor(context, x, y) {
        this.x = x;
        this.y = y;
        this.speed = 5;        
        this.dx = 0;
        this.dy = 0;
        this.context = context;                        
    }

    onHit(entity) {
        entity.damage(this.damageValue);
    }
}