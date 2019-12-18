import { Entity } from "./entity.js";

export class LightenEntity extends Entity {
    constructor(x, y, context) {
        super(x,y, context);      
        this.canProcessLight = false;        
    }

    //RADIUS
    processLight() {        
        if(!this.canProcessLight)
            return;
            
        const nbCouches = 2;
        const size = 50;
        var coucheNumberY = nbCouches;
        var coucheNumberX = nbCouches;
        var revertY = false;
        var revertX = false;    
        for(let i = -nbCouches; i <= nbCouches; i++) {  
            revertY = false;        
            coucheNumberY = nbCouches;              
            for(let j = -1 * nbCouches; j <= nbCouches; j++){                                   
                const pixels = this.context.getImageData(this.x + i * size, this.y + j * size, size, size);                
                var d = pixels.data;                
                    for (var p = 0; p < d.length; p+=4) {
                        const newValue = 50 - coucheNumberY * 8 - coucheNumberX * 8;
                        if(newValue > d[p] || newValue > d[p + 1] || newValue > d[p + 2] ) {
                            d[p] += newValue / 3; //r
                            //d[p+1] += newValue / 2;//g
                            //d[p+2] += newValue;//b
                        }
                                            
                    }                    
                this.context.putImageData(pixels, this.x + i * size, this.y + j * size);            
                
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
