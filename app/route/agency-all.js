const debug=require('debug')('debug');
const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCY = require('../service/agency-all');
const UTILS=require('../utils');
ROUTER.get('/', async function(req, res, next) {
    //debug('agency-all start...');
    try {
	res.json(await AGENCY.get());
    } catch (err) {
      console.error(`Error while getting agencies `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
    }
    //debug('agency-all done.');
});
module.exports = ROUTER;
