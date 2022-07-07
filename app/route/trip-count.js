const DEBUG=require('debug')('trip-count');
DEBUG('trip-count start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const TRIPCOUNT = require('../service/trip-count');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await TRIPCOUNT.getTripCount(req.query.agencyid));
  } catch (err) {
      console.error(`Error while getting route count, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('trip-count done.');
