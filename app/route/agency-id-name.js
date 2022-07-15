const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const agencyIdName = require('../service/agency-id-name');
const UTILS=require('../utils');
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await agencyIdName.get(req.query.oset, req.query.limit));
    } catch (err) {
	console.error(`Error while getting agency id and name with oset and linit `, err.message);
	res.status(err.statusCode || 500).json(UTILS.MSGS.error);
    }
});
module.exports = ROUTER;
