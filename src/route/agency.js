const DEBUG=require('debug')('agency');
DEBUG('agency start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const AGENCY = require('../service/agency');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await AGENCY.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    res.status(err.statusCode || 500).json({'message': err.message});
  }
});

module.exports = ROUTER;
DEBUG('agency done.');
