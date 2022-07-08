const debug=require('debug')('debug');
debug('datesServiceRemoved start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const datesServiceRemoved = require('../service/dates-service-removed');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await datesServiceRemoved.get(req.query.serviceid));
  } catch (err) {
      console.error(`Error while getting dates service removed, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
debug('datesServiceRemoved done.');
