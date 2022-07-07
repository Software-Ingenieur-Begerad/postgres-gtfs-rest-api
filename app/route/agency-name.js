const DEBUG=require('debug')('agency-name');
DEBUG('agency-name start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCYNAME = require('../service/agency-name');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
      res.json(await AGENCYNAME.getAgencyName(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting agency_name, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('agency-name done.');
