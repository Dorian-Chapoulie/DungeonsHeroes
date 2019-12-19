const mysql = require('../config/sql');

const checkCredentials = async (email, passwd) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT password FROM player where email like '${email}'`, (error, results, fields) => {
            if(error) throw error;                    
            resolve(results[0] && results[0].password === passwd);
        });
    });    
    return resultat;
}

module.exports.checkCredentials = checkCredentials;

