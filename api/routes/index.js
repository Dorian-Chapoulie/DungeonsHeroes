const Router = require('router');
const router = Router();

router.get('/', (req, res) => {    
    res.end('Hello, world!');
});


module.exports.router = router;