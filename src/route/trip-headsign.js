const DEBUG=require('debug')('trip-head-sign');
DEBUG('trip-head-sign start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const TRIPHEADSIGN = require('../service/trip-headsign');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await TRIPHEADSIGN.getTripHeadSign(req.query.tripshortname));
  } catch (err) {
    console.error(`Error while getting trip headsign, msg: `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('trip-head-sign done.');
