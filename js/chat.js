class Chat {
    constructor(socketHanlder) {
       this.socketHanlder = socketHanlder;
    }

    addEvents(socket) {
        socket.on('sendchat', (data) => {        
           this.socketHanlder.sendMessage('updatechat', data);
        });
    }
}

module.exports = Chat;
