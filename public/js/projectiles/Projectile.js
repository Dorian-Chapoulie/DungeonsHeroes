import { drawEntityAnimation } from '/js/graphics/graphics.js';

const hitSoundFire = new Audio();        
const hitSoundFrost = new Audio();        
const hitSoundPlayerProjectile = new Audio();        
const hitSoundPoison = new Audio();        
const hitSoundSilence = new Audio();        

(function initSounds(){
    hitSoundFire.src = '/media/sound/coin.mp3';
    hitSoundFrost.src = '/media/sound/coin.mp3';
    hitSoundPlayerProjectile.src = '/media/sound/coin.mp3';
    hitSoundPoison.src = '/media/sound/coin.mp3';
    hitSoundSilence.src = '/media/sound/coin.mp3';
})();

const playSound = type => {
    switch(type) {
        case 0: //Fire
        hitSoundFire.play();    
            break;
        case 1: //Frost
        hitSoundFire.play();  
            break;
        case 2: //Poison
        hitSoundFire.play();  
            break;
        case 3: //Silence
        hitSoundFire.play();  
            break;
        case 4: //Player
        hitSoundFire.play();  
            break;
    };
}
/*this.hitSound.addEventListener('canplaythrough', function(){
            this.play();
        });*/

export class Projectile {
    constructor(context, x, y, type) {
        this.x = x;
        this.y = y;
        this.speed = 2;        
        this.dx = 1;
        this.dy = 1;
        this.context = context;      
        this.type = type;                   
      
        this.frameX = 0;
        this.frameY = 0;
        this.scaleX = 32;
        this.scaleY = 32;

        this.drawTime = 50;
        this.canDrawNextFrame = true;
    }

    onHit(entity) {        
        entity.damage(this.damageValue);
        playSound(this.type);           
    }

    draw() {
        drawEntityAnimation(this);
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

    nextFrame = () => {
        if (this.canDrawNextFrame) {
            if (this.frameX++ >= this.image.width / this.width - 2) {
                this.frameX = 0;
            }
            this.canDrawNextFrame = false;
            setTimeout(() => {
                this.canDrawNextFrame = true;
            }, this.drawTime);
        }
    }


    move = () => {
        this.x += this.dx * this.speed;
        this.y += this.dy * this.speed;
    }
}