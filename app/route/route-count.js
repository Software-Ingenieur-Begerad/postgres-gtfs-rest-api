const debug=require('debug')('debug');
const express = require('express');
const router = express.Router();
const routeCount = require('../service/route-count');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
    //debug('route-count start...');
    try {
	res.json(await routeCount.get(req.query.agencyid));
    } catch (err) {
	console.error(`Error while getting route count, msg: `, err.message);
	res.status(err.statusCode || 500).json(utils.MSGS.error);
    }
    //debug('route-count done.');
});

module.exports = router;
