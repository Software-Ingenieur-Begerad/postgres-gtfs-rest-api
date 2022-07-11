const debug=require('debug')('debug');
debug('service-ability-by-route-id start...');
const express = require('express');
const router = express.Router();
const serviceAbilityByRouteId = require('../service/service-ability-by-route-id');
const utils=require('../utils');
router.get('/', async function(req, res, next) {
  try {
    res.json(await serviceAbilityByRouteId.get(req.query.routeid));
  } catch (err) {
      console.error(`Error while getting service availability by route_id, msg: `, err.message);
      res.status(err.statusCode || 500).json(utils.MSGS.error);
  }
});

module.exports = router;
debug('service-ability-by-route-id done.');
