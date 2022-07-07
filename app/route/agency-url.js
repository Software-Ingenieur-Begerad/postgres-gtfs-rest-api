const DEBUG=require('debug')('agency-url');
DEBUG('agency-url start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCYURL = require('../service/agency-url');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
      res.json(await AGENCYURL.getAgencyUrl(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting agency_url, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('agency-url done.');
