const Router = require('router');
const router = Router();
const skinsService = require('../services/skins');

router.get('/', async (req, res) => {       
    const result = await skinsService.getAllSkins();  
    const filteredResult = result.map(e => {
        return {id:e.id, path: e.path}
    });    
    if(result && !result.error && !!result)    {   
        res.end(JSON.stringify({
            skins: filteredResult,      
        }));
    }else {
        res.end(JSON.stringify({connected: false}));
    }                      
});

module.exports.router = router;