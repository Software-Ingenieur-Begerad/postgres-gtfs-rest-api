const DEBUG=require('debug')('agency');
DEBUG('agency start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCY = require('../service/agency');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await AGENCY.getMultiple(req.query.page));
    } catch (err) {
	console.error(`Error while getting agencies `, err.message);
	res.status(err.statusCode || 500).json(UTILS.MSGS.error);
    }
});

module.exports = ROUTER;
DEBUG('agency done.');
