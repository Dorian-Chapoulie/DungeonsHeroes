class Game {
    constructor(socketHanlder) {
        this.joueurs = [];
        this.isPlaying = false;

        this.WIDTH = 640;
        this.HEIGHT = 896;
        this.TILE_SIZE = 32;

        this.tiles = [
            1,
            2,
            3,
            4,
        ];

        this.socketHanlder = socketHanlder;
        this.map = [];
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomTile(forbidenValues) {
        let tile = 0;
        do {
            tile = this.tiles[this.getRandomInt(this.tiles.length)];
        } while (forbidenValues.find(e => e === tile));
        return tile;
    }

    sendMap() {
        if (this.map.length <= 0) {
            let row = [];
            let x = 0,
                y = 0;

            for (let i = 0; i < (this.WIDTH / this.TILE_SIZE) * (this.HEIGHT / this.TILE_SIZE); i++) {
                if (x == (this.WIDTH / this.TILE_SIZE)) {
                    x = 0;
                    y++
                    this.map.push(row);
                    row = [];
                }

                if (y == 0 && x != Math.ceil((this.WIDTH / this.TILE_SIZE) / 2) - 1) {
                    row.push(this.tiles[3]);
                } else if (x != Math.ceil((this.WIDTH / this.TILE_SIZE) / 2) - 1 && y == this.HEIGHT / this.TILE_SIZE - 1 || x == 0 || x == this.WIDTH / this.TILE_SIZE - 1) {
                    row.push(this.tiles[3]);
                } else {
                    row.push(this.getRandomTile([4]));
                }

                x++;
            }
            if (row.length > 0) this.map.push(row);
        }
        console.log("MAP: ", this.map);
        this.socketHanlder.sendMessage('map', this.map);
    }

    async startGameLoop() {
        this.isPlaying = true;
    }

    stopGameLoop() {
        this.isPlaying = false;
    }
}

module.exports = Game;