const mapTiles = [];

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

export const drawEntityAnimation = (context, entity) => {    
    drawFrame(context, entity.image, entity.frameX, entity.frameY, entity.x, entity.y);
    entity.nextFrame();
}

export const drawImage = (context, x, y, tileID, tilesSize) => {  
    if(mapTiles[tileID] === undefined) {  
        mapTiles[tileID] = new Image();
        mapTiles[tileID].src = '/media/tile' + tileID + '.png';
        mapTiles[tileID].onload = function(){
            context.drawImage(mapTiles[tileID], x, y, tilesSize, tilesSize);        
        }    
    }else {
        context.drawImage(mapTiles[tileID], x, y, tilesSize, tilesSize);       
    }
}

export const drawMap = (context, map, tilesSize) => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            drawImage(context, j * tilesSize, i * tilesSize, map[i][j], tilesSize);
        }
    }
}