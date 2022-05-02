const DEBUG=require('debug')('root');
DEBUG('root start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();

const ALIVE={
    'message': 'alive'
};

/* GET home page. */
ROUTER.get('/', function(req, res, next) {
    DEBUG('root msg: '+ALIVE.message);
    res.json(ALIVE);
});

module.exports = ROUTER;
DEBUG('root done.');
