const DEBUG=require('debug')('routes');
DEBUG('routes start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const ROUTES = require('../service/routes-all');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await ROUTES.get());
  } catch (err) {
    console.error(`Error while getting routes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('routes done.');
