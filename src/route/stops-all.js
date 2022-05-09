const DEBUG=require('debug')('stops');
DEBUG('stops start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const STOPS = require('../service/stops-all');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await STOPS.get());
  } catch (err) {
      console.error(`Error while getting stops `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('stops done.');
