const debug=require('debug')('debug');
debug('serviceAvailability start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const serviceAvailability = require('../service/service-availability');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await serviceAvailability.get(req.query.serviceid));
  } catch (err) {
      console.error(`Error while getting service availability, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
debug('serviceAvailability done.');
