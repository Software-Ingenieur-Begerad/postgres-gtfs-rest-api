const DEBUG=require('debug')('route-short-name');
DEBUG('route-short-name start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ROUTESHORTNAME = require('../service/route-short-name');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await ROUTESHORTNAME.getRouteShortName(req.query.tripshortname));
  } catch (err) {
      console.error(`Error while getting route_short_name, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('route-short-name done.');
