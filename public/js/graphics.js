const mapTiles = [];

export const drawFrame = (context, img, frameX, frameY, canvasX, canvasY) => {
    var scaledWidth = 84;
    var scaledHeight = 84;
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
    drawFrame(context, player.image, player.frameX, player.frameY, player.x, player.y);
    player.nextFrame();
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