const mapTiles = [];

export const drawFrame = (entity) => {
    entity.context.drawImage(
        entity.image,
        entity.frameX * entity.width,
        entity.frameY * entity.height,
        entity.width,
        entity.height,
        entity.x,
        entity.y,
        entity.scaleX,
        entity.scaleY,
    );    
}

export const drawEntityAnimation = (entity) => {    
    drawFrame(entity);
    entity.nextFrame();
}

export const drawImage = (context, x, y, tileID, tilesSize) => {  
    if(mapTiles[tileID] === undefined) {  
        mapTiles[tileID] = new Image();
        mapTiles[tileID].src = '/assets/tile' + tileID + '.png';
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
            console.log("draw map")
            drawImage(context, j * tilesSize, i * tilesSize, map[i][j], tilesSize);
        }
    }
}