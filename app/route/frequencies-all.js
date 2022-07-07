const DEBUG=require('debug')('frequencies');
DEBUG('frequencies start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const FREQUENCIES = require('../service/frequencies-all');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await FREQUENCIES.get());
  } catch (err) {
      console.error(`Error while getting frequencies `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('frequencies done.');
