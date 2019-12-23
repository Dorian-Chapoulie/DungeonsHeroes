const mysql = require('../lib/sql');

const getAllSkins = async () => {
    const resultat = await new Promise(resolve => {
        mysql.connection.query(`SELECT id, path FROM skin`, (error, results, fields) => {
            if(error) {
                console.log("ERREUR: ", error);
                resolve({error: error.sqlMessage});
            }                    
            resolve(results ? results : []);
        });
    });
    return resultat;
}

module.exports.getAllSkins = getAllSkins;
