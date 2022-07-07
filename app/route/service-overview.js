const DEBUG=require('debug')('service-overview');
DEBUG('service-overview start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SERVICEOVERVIEW = require('../service/service-overview');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await SERVICEOVERVIEW.getServiceOverview());
  } catch (err) {
      console.error(`Error while getting service overview, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('service-overview done.');
