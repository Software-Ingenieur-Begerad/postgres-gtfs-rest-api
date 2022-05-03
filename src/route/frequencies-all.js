const DEBUG=require('debug')('frequencies');
DEBUG('frequencies start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const FREQUENCIES = require('../service/frequencies-all');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await FREQUENCIES.get());
  } catch (err) {
    console.error(`Error while getting frequencies `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('frequencies done.');
