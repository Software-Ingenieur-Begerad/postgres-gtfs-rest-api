const DEBUG=require('debug')('debug');
DEBUG('debug start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const shapesOstLimit = require('../service/shapes-oset-limit');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await shapesOstLimit.get(req.query.oset, req.query.limit));
    } catch (err) {
	console.error(`Error while getting shapes with oset and linit `, err.message);
	res.status(err.statusCode || 500).json(UTILS.MSGS.error);
    }
});

module.exports = ROUTER;
DEBUG('debug done.');
