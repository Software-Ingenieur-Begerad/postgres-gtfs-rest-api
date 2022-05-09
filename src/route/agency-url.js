const DEBUG=require('debug')('agency-url');
DEBUG('agency-url start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCYURL = require('../service/agency-url');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
      res.json(await AGENCYURL.getAgencyUrl(req.query.routeid));
  } catch (err) {
    console.error(`Error while getting agency_url, msg: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('agency-url done.');
