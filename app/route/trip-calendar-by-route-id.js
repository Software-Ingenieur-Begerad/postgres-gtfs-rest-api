const debug=require('debug')('debug');
const express = require('express');
const router = express.Router();
const tripCalendarByRouteId = require('../service/trip-calendar-by-route-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
    //debug('trip-calendar-by-route-id start...');
    try {
	res.json(await tripCalendarByRouteId.get(req.query.routeid));
    } catch (err) {
	console.error(`Error while getting trip calendar by route_id, msg: `, err.message);k
	res.status(err.statusCode || 500).json(utils.MSGS.error);
    }
    //debug('trip-calendar-by-route-id done.');
});

module.exports = router;
