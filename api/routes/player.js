const Router = require('router');
const router = Router();
const playerService = require('../services/player');

router.post('/login', async (req, res) => {       
    const { email, password } = req.body;
    if(!email || !password) {
        //res.sendStatus(400)
        res.end(JSON.stringify({error: 'bad request'}));
    }
    const result = await playerService.checkCredentials(email, password);    
    if(result && !result.error && !!result)    {
        const resultPseudo = await playerService.getPseudoFromEmail(email);
        const resultMoney = await playerService.getMoneyFromEmail(email);         
        res.end(JSON.stringify({connected: !!result, pseudo: resultPseudo.pseudo, money: resultMoney.money}));
    }else {
        res.end(JSON.stringify({connected: false}));
    }                      
});

router.put('/register', async (req, res) => {       
    const { email, password, pseudo } = req.body;    
    if(!email || !password || !pseudo) {
        //res.sendStatus(400)
        res.end(JSON.stringify({error: 'bad request'}));
    }
    const ret = await playerService.register(email, password, pseudo); 
    if(ret.error) {
       //res.sendStatus(400) 
       res.end(JSON.stringify(ret));
    }else {
        res.end(JSON.stringify({registered: !!ret}));        
    }
});

module.exports.router = router;