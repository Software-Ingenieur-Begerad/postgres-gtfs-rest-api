const DEBUG=require('debug')('agency-name');
DEBUG('agency-name start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCYNAME = require('../service/agency-name');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
      res.json(await AGENCYNAME.getAgencyName(req.query.routeid));
  } catch (err) {
    console.error(`Error while getting agency_name, msg: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('agency-name done.');
