class SocketsHanlder {
    constructor(io) {
        this.io = io;
        this.initEvents();
    }    
    
    sendNextLevel() {
        for(let i = 0; i < this.game.joueurs.length; i++) {
            this.io.emit('reposplayer', {socketId: this.game.joueurs[i].socketId, x: i * 504 + 36, y: 792 });                   
        }                            
        this.game.level++;   
        this.game.sendMap(); 
        this.game.mobs = 0;
        this.game.deadMobsNumber = 0;
        setTimeout(() => {
            this.game.sendMobs();
        }, 3000);
    }

    initEvents() {
        this.io.sockets.on('connection', socket => {        
            this.chat.addEvents(socket);    
            this.game.sendMap();    

            socket.on('newplayer', (data) => {  
                const {name, x, y} = data;
                socket.broadcast.emit('newplayer', {name, x, y, socketId: socket.id}); 
                socket.emit('playerlist', this.game.joueurs);                  
                this.game.joueurs.push({name: data.name, x: data.x, y: data.y, socketId: socket.id});  

                if(this.game.joueurs.length == 2) {
                    setTimeout(() => {
                        this.game.sendMobs();
                    }, 2000);                    
                }                                    
                             
            });                            
        

            socket.on('playermove', (data) => {                                                 
                socket.broadcast.emit('playermove', data);            
                /*const player = this.game.joueurs.find(p => p.name === data.name);                
                switch(data.pos) {
                    case 'z':
                        player.y -= 5;
                        break;
                    case 's':
                        player.y += 5;
                        break;
                    case 'q':
                        player.x -= 5;
                        break;
                    case 'd':
                        player.x += 5;
                        break;
                }*/
            });

            socket.on('playerpos', data => {                                                 
                socket.broadcast.emit('playerpos', data);            
            });

            socket.on('playerhs', data => {                                                 
                socket.broadcast.emit('playerhs', data);            
            });

            socket.on('deadmob', dm => { 
                let isAlreadyDead = false;
                this.game.deadMobs.forEach(d => {
                    if(d === dm.id) {
                        isAlreadyDead = true;
                    }
                });
                if(!isAlreadyDead) {
                    this.game.deadMobs.push(dm.id);
                    this.game.deadMobsNumber++;
                    this.game.sendLoots(dm); 
                    this.io.emit('deadmob', dm.id);  
                    if(this.game.deadMobsNumber == this.game.mobs){
                        this.io.emit('levelfinished', {});
                    }  
                }                
            });

            socket.on('enternextlevel', data => {                                                 
                this.sendNextLevel();
            });

            socket.on('playershoot', targetId => {                                                 
                socket.broadcast.emit('playershoot', targetId);        
            });

            socket.on('lootpickup', data => {                                                               
                this.io.emit('lootpickup', data);        
            });

            socket.on('hitentity', data => { 
               /* let insert = true;
                const senderShoots = this.game.shootIds.filter(s => s.sender === data.sender);
                senderShoots.forEach(s => {
                    if(s.id === data.shootId) {
                        insert = false;
                    }
                });

                if(insert) {
                    this.game.shootIds.push({
                        sender: data.sender,
                        id: data.shootId,
                    });
                    socket.broadcast.emit('hitentity', data);    
                }else {
                    for(let i = 0; i < this.game.shootIds.length; i++){
                        if(this.game.shootIds[i].sender === data.sender && this.game.shootIds[i].id === data.shootId) {
                            this.game.shootIds[i] = undefined;
                        }
                    }
                    this.game.shootIds = this.game.shootIds.filter(e => e !== undefined);                    
                }*/   
                socket.broadcast.emit('hitentity', data);                                                                   
            }); 

            socket.on('respawnplayer', () => {      
                const playerToRespawn = this.game.joueurs.filter(j => j.socketId !== socket.id)[0];                                           
                this.io.emit('respawnplayer', {name: playerToRespawn.name, id: playerToRespawn.socketId});            
            });

            socket.on('disconnect', () => {                                 
                const disconnectedPlayer = this.game.joueurs.find(p => p.socketId === socket.id);
                socket.broadcast.emit('playerdisconnected', disconnectedPlayer);
                this.game.joueurs = this.game.joueurs.filter(j => j !== disconnectedPlayer);                                
            });
        });       

    }

    sendMessage(event, data) {
        this.io.sockets.emit(event, data);
    }

};

module.exports = SocketsHanlder;