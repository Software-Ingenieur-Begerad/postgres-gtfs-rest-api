const DEBUG=require('debug')('agency');
DEBUG('agency start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCY = require('../service/agency-all');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await AGENCY.get());
  } catch (err) {
    console.error(`Error while getting agencies `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('agency done.');
