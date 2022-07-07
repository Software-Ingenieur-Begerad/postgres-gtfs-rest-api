const DEBUG=require('debug')('debug');
DEBUG('table-names start...');

const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const tableNames = require('../service/table-names');
const UTILS=require('../utils');

//GET listing
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await tableNames.get());
    } catch (err) {
      console.error(`Error while getting table names `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});

module.exports = ROUTER;
DEBUG('table-names done.');
