const debug=require('debug')('debug');
debug('services-by-route-id start...');
const express = require('express');
const router = express.Router();
const serviceByRouteId = require('../service/services-by-route-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
  try {
    res.json(await serviceByRouteId.get(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting services by route_id, msg: `, err.message);
      res.status(err.statusCode || 500).json(utils.MSGS.error);
  }
});

module.exports = router;
debug('services-by-route-id done.');
