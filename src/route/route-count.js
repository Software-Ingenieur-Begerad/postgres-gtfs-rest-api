const DEBUG=require('debug')('route-count');
DEBUG('route-count start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ROUTECOUNT = require('../service/route-count');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await ROUTECOUNT.getRouteCount(req.query.agencyid));
  } catch (err) {
      console.error(`Error while getting route count, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('route-count done.');
