const DEBUG=require('debug')('servicedays');
DEBUG('servicedays start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SERVICEDAYS = require('../service/servicedays');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await SERVICEDAYS.getServiceDays(req.query.routeshortname));
  } catch (err) {
      console.error(`Error while getting service days, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('servicedays done.');
