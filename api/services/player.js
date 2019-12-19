const mysql = require('../lib/sql');

const checkCredentials = async (email, passwd) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT password FROM player where email like '${email}'`, (error, results, fields) => {
            if(error) throw error;                    
            resolve(results && results[0] && results[0].password === passwd);
        });
    });
    return resultat;
}

const register = async (email, passwd, pseudo) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`INSERT INTO player (pseudo,email,password) VALUES ('${pseudo}', '${email}', '${passwd}')`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }
            resolve(true);
        });
    });    
    return resultat;
}

module.exports.checkCredentials = checkCredentials;
module.exports.register = register;

