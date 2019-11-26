class SocketsHanlder {
    constructor(io) {
        this.io = io;
        this.initEvents();
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