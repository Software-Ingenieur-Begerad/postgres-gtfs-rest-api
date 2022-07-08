const debug=require('debug')('debug');
debug('datesServiceAvailable start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const datesServiceAvailable = require('../service/dates-service-available');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await datesServiceAvailable.get(req.query.serviceid));
  } catch (err) {
      console.error(`Error while getting dates service available, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
debug('datesServiceAvailable done.');
