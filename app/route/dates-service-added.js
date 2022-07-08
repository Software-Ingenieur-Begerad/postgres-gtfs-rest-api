const debug=require('debug')('debug');
debug('datesServiceAdded start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const datesServiceAdded = require('../service/dates-service-added');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await datesServiceAdded.get(req.query.serviceid));
  } catch (err) {
      console.error(`Error while getting dates service added, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
debug('datesServiceAdded done.');
