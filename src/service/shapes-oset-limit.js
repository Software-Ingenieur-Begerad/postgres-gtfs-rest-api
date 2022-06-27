const debug=require('debug')('debug');
debug('debug start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get(oset = 1,limit = 100) {
    //debug('oset: '+oset);
    //debug('limit: '+limit);
    const offset = helper.getOffset(oset, limit);
    const rows = await db.query(
	'SELECT * FROM shapes OFFSET $1 LIMIT $2',
	[offset, limit]
    );
    const data = helper.emptyOrRows(rows);
    return data;
};
module.exports = {
  get
};
debug('debug done.');
