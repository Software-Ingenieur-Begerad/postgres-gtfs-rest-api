const debug=require('debug')('debug');
const express = require('express');
const router = express.Router();
const tripCalendarByAgencyId = require('../service/trip-calendar-by-agency-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
    //debug('trip-calendar-by-agency-id start...');
    try {
	res.json(await tripCalendarByAgencyId.get(req.query.agencyid));
    } catch (err) {
	console.error(`Error while getting trip calendar by agency_id, msg: `, err.message);
	res.status(err.statusCode || 500).json(utils.MSGS.error);
    }
    //debug('trip-calendar-by-agency-id done.');
});
module.exports = router;
