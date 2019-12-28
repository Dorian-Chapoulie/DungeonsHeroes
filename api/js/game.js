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
            5,
            6,
        ];

        this.mobId = [
            0,
            1,
            2,
            3,
            4,
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
            "Chest": [
                this.loots.Coin,
                this.loots.Armor,
                this.loots.Heart,
            ],
            "Sahrotaar": [
                this.loots.Coin,
            ],
        }

        this.shootIds = [];
        this.deadMobs = [];
        this.chests = [];
        this.deadMobsNumber = 0;
        this.mobs = 0;
        this.bossLevel = 2;
        this.preBossLevel = this.bossLevel - 1;

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
                mobType: this.mobId[this.getRandomInt(0, this.mobId.length - 1)],
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

    sendBoss() {
        this.socketHanlder.sendMessage('mobs',
        [{
            mobType: 5,            
            position: {
                x: this.WIDTH / 2 - 96 / 2,
                y: this.HEIGHT / 2 - 96 / 2,
            },
            id: this.getRandomInt(0, 10000000000000),
        }]);
    }

    sendChestsLoots(mob) {
        const possibleLoots = this.mobsLoots[mob.name];
        for(let i = 0; i < 12; i++) {
            this.socketHanlder.sendMessage('loots', {
                type: possibleLoots[this.getRandomInt(0, possibleLoots.length)],
                position: {
                    x: mob.position.x + this.getRandomInt(0, 128),
                    y: mob.position.y + this.getRandomInt(0, 128),
                },
                id: this.getRandomInt(0, 10000000000000),
            });
        }
    }

    sendChests() {      
        const chestsNumber = 4;
        for (let i = 0; i < chestsNumber; i++) {
            this.chests.push({
                mobType: 4,
                position: {
                    x: i * 100 + 64,
                    y: this.HEIGHT / 2 - 100,
                },
                id: this.getRandomInt(0, 10000000000000),
            });
        }
        this.socketHanlder.sendMessage('mobs', this.chests);
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
                    row.push(this.getRandomTile([1, 2, 5, 6]));
                } else if (x == 0) {
                    row.push(this.getRandomTile([1, 2, 3, 4, 6]));
                } else if(x == this.WIDTH / this.TILE_SIZE - 1) {
                    row.push(this.getRandomTile([1, 2, 3, 4, 5]));
                } else {
                    row.push(this.getRandomTile([4, 3, 5, 6]));
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