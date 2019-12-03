const config = require('./config/config');
const http = require('http'); 
const path = require("path");
const express = require('express');  

//const fs = require('fs');
//const https = require('https');
//const privateKey  = fs.readFileSync('./certificats/KEY.key', 'utf8');
//const certificate = fs.readFileSync('./certificats/CERT.cert', 'utf8');
//const credentials = {key: privateKey, cert: certificate};

const app = express();
const server = http.createServer(app);//https.createServer(credentials, app);
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

//var s = new PeerServer({port: port, allow_discovery: true});

console.log('Server running at http://192.168.1.50:' + config.port);  