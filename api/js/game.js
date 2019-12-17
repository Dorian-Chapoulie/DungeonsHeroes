class Game {
    constructor(socketHanlder) {
        this.joueurs = [];
        this.isPlaying = false;

        this.level = 0;

        this.WIDTH = 640;
        this.HEIGHT = 896;
        this.TILE_SIZE = 32;

        this.tiles = [
            1,
            2,
            3,
            4,
        ];

        this.mobId = [
            0,
            1,
            2,
            3,
        ];

        this.loots = {
            Coin: 0,
            Heart: 1,
            Armor: 2,
            boostSpeed: 3,
            boostDamage: 4
        };

        this.mobsLoots = {
            "Skeleton": [
                this.loots.Coin,
                this.loots.Heart,
                this.loots.Armor,
            ],
            "Wizzard": [
                this.loots.boostDamage,
                this.loots.boostSpeed,
                this.loots.Heart,
            ],
            "Witch": [
                this.loots.Armor,
                this.loots.Heart,
                this.loots.boostDamage,
            ],
            "Warlock": [
                this.loots.boostDamage,
                this.loots.boostSpeed,
                this.loots.Coin,
            ],
        }

        this.shootIds = [];
        this.deadMobs = [];
        this.deadMobsNumber = 0;
        this.mobs = 0;

        this.socketHanlder = socketHanlder;
        this.map = [];
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * Math.floor(max - min) + min);
    }

    generateMobs() {
        const ret = [];
        this.mobs = this.level + 1;
        for (let i = 0; i < this.mobs; i++) {
            ret.push({
                mobType: this.mobId[this.getRandomInt(0, this.mobId.length)],
                target: this.joueurs[this.getRandomInt(0, this.joueurs.length)].socketId,
                position: {
                    x: this.getRandomInt(this.TILE_SIZE, this.WIDTH - this.TILE_SIZE * 3),
                    y: this.getRandomInt(this.TILE_SIZE, this.HEIGHT - this.TILE_SIZE * 3),
                },
                id: this.getRandomInt(0, 10000000000000),
            });
        }
        return ret;
    }



    getRandomTile(forbidenValues) {
        let tile = 0;
        do {
            tile = this.tiles[this.getRandomInt(0, this.tiles.length)];
        } while (forbidenValues.find(e => e === tile));
        return tile;
    }

    sendMobs() {
        this.socketHanlder.sendMessage('mobs', this.generateMobs());
    }

    sendLoots(mob) {
        const possibleLoots = this.mobsLoots[mob.name];
        this.socketHanlder.sendMessage('loots', {
            type: possibleLoots[this.getRandomInt(0, possibleLoots.length)],
            position: {
                x: mob.position.x + 30,
                y: mob.position.y + 30,
            },
            id: this.getRandomInt(0, 10000000000000),
        });
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

                if (y == 0 || y == this.HEIGHT / this.TILE_SIZE - 1) {
                    row.push(this.tiles[3]);
                } else if (x == 0 || x == this.WIDTH / this.TILE_SIZE - 1) {
                    row.push(this.tiles[3]);
                } else {
                    row.push(this.getRandomTile([4]));
                }

                x++;
            }
            if (row.length > 0) this.map.push(row);
        }

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