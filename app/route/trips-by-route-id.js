const debug=require('debug')('debug');
debug('trips-by-route-id start...');
const express = require('express');
const router = express.Router();
const tripsByRouteId = require('../service/trips-by-route-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
  try {
    res.json(await tripsByRouteId.get(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting trips by route_id, msg: `, err.message);
      res.status(err.statusCode || 500).json(utils.MSGS.error);
  }
});

module.exports = router;
debug('trips-by-route-id done.');
