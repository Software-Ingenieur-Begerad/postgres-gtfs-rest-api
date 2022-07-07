const DEBUG=require('debug')('service');
DEBUG('service start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const SERVICE = require('../service/service');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
  try {
    res.json(await SERVICE.getService(req.query.serviceid));
  } catch (err) {
      console.error(`Error while getting service, msg: `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('service done.');
