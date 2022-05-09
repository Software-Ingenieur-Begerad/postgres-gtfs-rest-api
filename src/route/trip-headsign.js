const DEBUG=require('debug')('trip-headsign');
DEBUG('trip-headsign start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const TRIPHEADSIGN = require('../service/trip-headsign');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await TRIPHEADSIGN.getTripHeadSign(req.query.tripshortname));
  } catch (err) {
      console.error(`Error while getting trip_headsign, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('trip-headsign done.');
