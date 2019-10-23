class Game {    
    constructor(socketHanlder) {
        this.joueurs = [];
        this.isPlaying = false;

        this.WIDTH = 640;
        this.HEIGHT = 896;
        this.TILE_SIZE = 128;

        this.tiles = [
            1,
            2,
        ];

        this.socketHanlder = socketHanlder;
        this.sendMap();
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }   

    sendMap() {
        const map = [];
        let row = [];  
        let x = 0;                

        for(let i = 0; i < (this.WIDTH / this.TILE_SIZE) * (this.HEIGHT / this.TILE_SIZE); i++) {                       
            if(x == (this.WIDTH / this.TILE_SIZE)) {                
                x = 0;                     
                map.push(row);                
                row = [];                
            }
            row.push(this.tiles[this.getRandomInt(this.tiles.length)]);                
            x++;                             
        }                    
        if(row.length > 0) map.push(row);            
        this.socketHanlder.sendMessage('map', map);
    }

    async startGameLoop() {
        this.isPlaying = true;       
    }

    stopGameLoop() {
        this.isPlaying = false;
    }
}

module.exports = Game;