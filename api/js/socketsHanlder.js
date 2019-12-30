const CGame = require('./game');

class SocketsHanlder {
    constructor(io) {
        this.io = io;
        this.initEvents();
        this.sockets = [];
    }    
    
    sendNextLevel() {
        if(this.game.isKeyPickedUp) {            
            this.game.joueurs.forEach(p => {
                try {
                    const ids = [];
                    this.sockets.forEach(s => {
                        if(s.id === p.socketId) {   
                            ids.push(p.socketId);
                            s.emit('disconnect', {});                         
                            s.disconnect();                                                      
                        }
                    });                                                                              
                }catch(e) {
                    console.log("can't disconnect player " + p.name, e);
                }
            });
            this.game = new CGame(this);
            this.sockets = [];
            //disco players
        }else {
            for(let i = 0; i < this.game.joueurs.length; i++) {
                this.io.emit('reposplayer', {socketId: this.game.joueurs[i].socketId, x: i * 504 + 36, y: 792 });                   
            }                            
            this.game.level++;   
            if(this.game.level === this.game.bossLevel) {
                setTimeout(() => {
                    this.game.sendBoss();
                }, 3000);
            }else if(this.game.level === this.game.preBossLevel) {
                this.game.sendChests();
            } else {            
                setTimeout(() => {
                    this.game.sendMobs();
                }, 3000);
            }         
            this.game.mobs = 0;
            this.game.deadMobsNumber = 0;      
            this.game.sendMap();
        }  
    }

    initEvents() {
        this.io.sockets.on('connection', socket => {        
            this.chat.addEvents(socket);    
            this.game.sendMap();            
            this.sockets.push(socket);            

            socket.on('newplayer', (data) => {  
                const {name, x, y, skinId} = data;
                socket.emit('getid', {id: socket.id});
                socket.broadcast.emit('newplayer', {name, x, y, socketId: socket.id, skinId}); 
                socket.emit('playerlist', this.game.joueurs);                  
                this.game.joueurs.push({name: data.name, x: data.x, y: data.y, socketId: socket.id, skinId});  

                if(this.game.joueurs.length == 2) {
                    setTimeout(() => {
                        this.game.sendMobs();
                    }, 2000);                    
                }                                    
                             
            });                            
        

            socket.on('playermove', (data) => {                                                 
                socket.broadcast.emit('playermove', data);
            });

            socket.on('playerpos', data => {                                                 
                socket.broadcast.emit('playerpos', data);            
            });

            socket.on('getmap', () => {                                                 
                socket.emit('map', this.game.map);            
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
                        this.game.map = [];
                    }  
                }                
            });

            socket.on('chestopen', dm => { 
                this.game.chests.forEach(d => {
                    if(d.id === dm.id) {
                        this.game.sendChestsLoots(dm);                        
                    }
                });
                this.game.chests = this.game.chests.filter(c => c.id !== dm.id); 
                if(this.game.chests.length <= 0)
                    this.io.emit('levelfinished', {});                                            
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

            socket.on('keypickedup', data => { 
                this.io.emit('levelfinished', {});    
                this.game.isKeyPickedUp = true;                     
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
                this.io.emit('hitentity', data);                                                                   
            }); 

            socket.on('touchtorch', data => {                                                               
                this.io.emit('touchtorch', data);        
            });

            socket.on('disconnect', () => {                                 
                const disconnectedPlayer = this.game.joueurs.find(p => p.socketId === socket.id);
                console.log("disconnected player: ", disconnectedPlayer)
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