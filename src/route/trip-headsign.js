const DEBUG=require('debug')('trip-headsign');
DEBUG('trip-headsign start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const TRIPHEADSIGN = require('../service/trip-headsign');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await TRIPHEADSIGN.getTripHeadSign(req.query.tripshortname));
  } catch (err) {
    console.error(`Error while getting trip_headsign, msg: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('trip-headsign done.');
