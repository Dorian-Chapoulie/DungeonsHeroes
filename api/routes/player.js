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
        const resultLootBoxes = await playerService.getLootBoxesFromEmail(email);   
        const resultSkinId = await playerService.getSkinIdFromEmail(email);      
        const resultSkinsInventory = await playerService.getInventorySkinsFromEmail(email);      
        res.end(JSON.stringify({
            connected: !!result,
            email,
            pseudo: resultPseudo.pseudo,
            money: resultMoney.money,
            lootboxes: resultLootBoxes.lootbox,
            skinId: resultSkinId.skinid,   
            skins: resultSkinsInventory.map(e => e.skinid),         
        }));
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

router.post('/buy', async (req, res) => {       
    const { email, ammount, price } = req.body;    
    if(!email || !ammount || !price) {
        //res.sendStatus(400)
        res.end(JSON.stringify({error: 'bad request'}));
    }

    const resultMoney = await playerService.getMoneyFromEmail(email);           
    if(resultMoney.money < price) {
        res.end(JSON.stringify({error: "money"}));
    }else {
        const resultLootBoxes = await playerService.getLootBoxesFromEmail(email); 
        const totalLootBoxes = parseInt(resultLootBoxes.lootbox, 10) + parseInt(ammount, 10);
        const newMoney = parseInt(resultMoney.money,10) - parseInt(price, 10);
        const ret = await playerService.buyLootBoxesFromEmail(email, totalLootBoxes, newMoney);            
        if(ret.error) {
            //res.sendStatus(400) 
            res.end(JSON.stringify({ret}));
         }else {
            res.end(JSON.stringify({transaction: !!ret, money: newMoney, lootboxes: totalLootBoxes}));        
         }
    }            
});

router.post('/setskin', async (req, res) => {       
    const { email, skinId } = req.body;    
    if(!email || !skinId) {
        //res.sendStatus(400)
        res.end(JSON.stringify({error: 'bad request'}));
    }
    const ret = await playerService.setActivatedSkin(email, skinId);             
    if(ret.error) {
        //res.sendStatus(400) 
        res.end(JSON.stringify({ret}));
    }else {
        res.end(JSON.stringify({activatedSkin: !!ret}));        
    }
        
});

router.put('/addskin', async (req, res) => {       
    const { email, skinId } = req.body;    
    if(!email || !skinId) {
        //res.sendStatus(400)
        res.end(JSON.stringify({error: 'bad request'}));
    }
    const ret = await playerService.addSkin(email, skinId);             
    if(ret.error) {
        //res.sendStatus(400) 
        res.end(JSON.stringify({ret}));
    }else {
        res.end(JSON.stringify({activatedSkin: !!ret}));        
    }
        
});

module.exports.router = router;