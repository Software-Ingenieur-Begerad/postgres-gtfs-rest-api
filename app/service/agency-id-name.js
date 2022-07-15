const debug=require('debug')('debug');
const db = require('./db');
const helper = require('../helper');
async function get(oset = 1,limit = 100) {
    //debug('agencyIdName start...');
    const offset = helper.getOffset(oset, limit);
    const rows = await db.query(
	'SELECT agency.agency_id,agency.agency_name FROM agency OFFSET $1 LIMIT $2',
	[offset, limit]
    );
    const data = helper.emptyOrRows(rows);
    //debug('agencyIdName done.');
    return data;
};
module.exports = {
  get
};
