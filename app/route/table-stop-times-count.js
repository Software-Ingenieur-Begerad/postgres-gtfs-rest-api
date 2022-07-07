const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const tableCount = require('../service/table-stop-times-count');
const UTILS=require('../utils');
//GET listing
ROUTER.get('/', async function(req, res, next) {
    try {
	res.json(await tableCount.get());
    } catch (err) {
      console.error(`Error while getting table count `, err.message);
      res.status(err.statusCode || 500).json(UTILS.MSGS.error);
  }
});
module.exports = ROUTER;
