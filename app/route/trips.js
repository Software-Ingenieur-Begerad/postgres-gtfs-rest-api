const DEBUG=require('debug')('trips');
DEBUG('trips start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const TRIPS = require('../service/trips');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await TRIPS.getTrips(req.query.routeshortname));
  } catch (err) {
      console.error(`Error while getting trips, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('trips done.');
