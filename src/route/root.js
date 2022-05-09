const DEBUG=require('debug')('root');
DEBUG('root start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const UTILS=require('../utils');

/* GET home page. */
ROUTER.get('/', function(req, res, next) {
    DEBUG('root msg: '+UTILS.MSGS.alive);
    res.json(UTILS.MSGS.alive);
});

module.exports = ROUTER;
DEBUG('root done.');
