const mysql = require('mysql');
const config = require('../config/config');

const connection = mysql.createConnection(config.mysql);
connection.connect(function(err) {
    if (err) throw err;    
});

module.exports.connection = connection;