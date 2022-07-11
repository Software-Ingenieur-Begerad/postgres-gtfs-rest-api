const debug=require('debug')('debug');
debug('trip-calendar-by-route-id start...');
const express = require('express');
const router = express.Router();
const tripCalendarByRouteId = require('../service/trip-calendar-by-route-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
  try {
    res.json(await tripCalendarByRouteId.get(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting trip calendar by route_id, msg: `, err.message);
      res.status(err.statusCode || 500).json(utils.MSGS.error);
  }
});

module.exports = router;
debug('trip-calendar-by-route-id done.');
