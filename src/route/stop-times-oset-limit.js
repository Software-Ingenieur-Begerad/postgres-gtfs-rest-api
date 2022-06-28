const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const stopTimesOsetLimit = require('../service/stop-times-oset-limit');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await stopTimesOsetLimit.get(req.query.oset, req.query.limit));
    } catch (err) {
	console.error(`Error while getting stop_times with oset and linit `, err.message);
	res.status(err.statusCode || 500).json(UTILS.MSGS.error);
    }
});

module.exports = ROUTER;
