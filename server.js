const config = require('./config/config');
const http = require('http'); 
const path = require("path");
const express = require('express');  
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);

const CSocketHanlder = require('./js/socketsHanlder');
const CGame = require('./js/game');
const CChat = require('./js/chat');


const socketsHanlder = new CSocketHanlder(io);
const game = new CGame(socketsHanlder);
const chat = new CChat(socketsHanlder);

socketsHanlder.game = game;
socketsHanlder.chat = chat;
  
server.listen(config.port);
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

console.log('Server running at http://127.0.0.1:' + config.port);  