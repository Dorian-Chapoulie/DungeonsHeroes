import { Entity } from "./entity.js";

export class LightenEntity extends Entity {
    constructor(x, y, context) {
        super(x,y, context);      
        this.canProcessLight = false;  
        this.changeRed = false;
        this.changeGreen = false;
        this.changeBlue = false;
        
        this.brightNess = 30;
        this.brightNessRed = 0;
        this.brightNessGreen = 0;
        this.brightNessBlue = 0;
        this.nbCouches = 2;
    }

    //RADIUS
    async processLight() {        
        if(!this.canProcessLight)
            return;
                            
        var coucheNumberY = this.nbCouches;
        var coucheNumberX = this.nbCouches;
        var revertY = false;
        var revertX = false;    
        for(let i = -this.nbCouches; i <= this.nbCouches; i++) {  
            revertY = false;        
            coucheNumberY = this.nbCouches;              
            for(let j = -1 * this.nbCouches; j <= this.nbCouches; j++){                                   
                const pixels = this.context.getImageData(this.x + i * this.scaleX, this.y + j * this.scaleY, this.scaleX, this.scaleY);                
                var d = pixels.data;                
                    for (var p = 0; p < d.length; p+=4) {
                        const newValue = this.brightNess - coucheNumberY * 20 - coucheNumberX * 20;
                        //if(newValue > d[p] || newValue > d[p + 1] || newValue > d[p + 2] ) {
                            if(this.changeRed)
                                d[p] += (newValue + this.brightNessRed);
                            if(this.changeGreen)
                                d[p+1] += (newValue + this.brightNessGreen);
                            if(this.changeBlue)
                                d[p+2] += (newValue + this.brightNessBlue);
                        //}
                                            
                    }                    
                this.context.putImageData(pixels, this.x + i * this.scaleX, this.y + j * this.scaleY);            
                
                if(coucheNumberY == 0) {
                    revertY = true;
                }            
                
                if(revertY) {
                    coucheNumberY++;
                }else {
                    coucheNumberY--;
                }                                       
            }
    
            if(coucheNumberX == 0) {            
                revertX = true;
            }
    
            if(revertX) {
                coucheNumberX++;
            }else {
                coucheNumberX--;
            } 
        }
    }
    
};
