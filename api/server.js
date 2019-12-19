const config = require('./config/config');
const http = require('http'); 
const express = require('express');  
const bodyParser = require('body-parser');

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
app.use(bodyParser.json());
app.use('/api', require('./routes/index').router);
app.use('/api/player', require('./routes/player').router);


console.log('Server running at http://localhost:' + config.port);  