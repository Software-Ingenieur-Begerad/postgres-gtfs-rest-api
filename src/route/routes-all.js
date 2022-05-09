const DEBUG=require('debug')('routes');
DEBUG('routes start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ROUTES = require('../service/routes-all');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await ROUTES.get());
  } catch (err) {
      console.error(`Error while getting routes `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('routes done.');
