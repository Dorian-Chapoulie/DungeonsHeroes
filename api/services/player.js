const mysql = require('../lib/sql');

const checkCredentials = async (email, passwd) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT password FROM player where email like '${email}'`, (error, results, fields) => {
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }                    
            resolve(results && results[0] && results[0].password === passwd);
        });
    });
    return resultat;
}

const getPseudoFromEmail = async (email) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT pseudo FROM player where email like '${email}'`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }
            resolve(results ? results[0] : '');
        });
    });    
    return resultat;
}

const getMoneyFromEmail = async (email) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT money FROM player where email like '${email}'`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }
            resolve(results ? results[0] : '');
        });
    });    
    return resultat;
}

const getLootBoxesFromEmail = async (email) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT lootbox FROM player where email like '${email}'`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }
            resolve(results ? results[0] : '');
        });
    });    
    return resultat;
}

const getSkinIdFromEmail = async (email) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT skinid FROM player where email like '${email}'`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }
            resolve(results ? results[0] : '');
        });
    });    
    return resultat;
}


const buyLootBoxesFromEmail = async (email, ammount, money) => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`UPDATE player SET lootbox = '${ammount}', money = '${money}' where email like '${email}'`, (error, results, fields) => {    
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }            
            resolve(results !== undefined);
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
module.exports.getPseudoFromEmail = getPseudoFromEmail;
module.exports.getMoneyFromEmail = getMoneyFromEmail;
module.exports.getLootBoxesFromEmail = getLootBoxesFromEmail;
module.exports.buyLootBoxesFromEmail = buyLootBoxesFromEmail;
module.exports.getSkinIdFromEmail = getSkinIdFromEmail;