const debug=require('debug')('debug');
debug('calendarDatesOsetLimit start...');
const db = require('./db');
const helper = require('../helper');

async function get(oset = 1,limit = 100) {
    const offset = helper.getOffset(oset, limit);
    const rows = await db.query(
	'SELECT * FROM calendar_dates OFFSET $1 LIMIT $2',
	[offset, limit]
    );
    const data = helper.emptyOrRows(rows);
    return data;
};
module.exports = {
  get
};
debug('calendarDatesOsetLimit done.');
