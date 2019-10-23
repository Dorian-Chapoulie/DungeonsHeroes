export const drawFrame = (context, img, frameX, frameY, canvasX, canvasY) => {
    var scaledWidth = 64;
    var scaledHeight = 64;
    var width = 64;
    var height = 64;
    context.drawImage(
        img,
        frameX * width,
        frameY * height,
        width,
        height,
        canvasX,
        canvasY,
        scaledWidth,
        scaledHeight,
    );
}

export const drawPlayerAnimation = (context, player) => {    
    drawFrame(context, player.image, player.frame, player.frameY, player.x, player.y);     
    player.nextFrame();                
}

export const drawImage = (context, x, y, tileID, tilesSize) => {    
    const base_image = new Image();
    base_image.src = '/media/tile' + tileID + '.png';
    base_image.onload = function(){
        context.drawImage(base_image, x, y, tilesSize, tilesSize);        
    }    
}

export const drawMap = (context, map, tilesSize) => {        
    for(let i = 0; i < map.length; i++) {
        for(let j = 0; j < map[i].length; j++) {
            drawImage(context, j * tilesSize, i * tilesSize, map[i][j], tilesSize);
        }
    }       
}