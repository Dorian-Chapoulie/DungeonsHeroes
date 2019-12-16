const config = require('./config/config');
const http = require('http'); 
const express = require('express');  
const path = require("path");

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

//app.use('/api', require('./routes/index').router);

/* TEMPORAIRE, IL FAUT FINIR LES ROUTES !!!!*/
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});


console.log('Server running at http://localhost:' + config.port);  