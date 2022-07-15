const debug=require('debug')('debug');
const db = require('./db');
const helper = require('../helper');
const config = require('../config');
async function get() {
    //debug('agency-all start...');
    const DATA = await db.query(
	'SELECT agency.agency_id FROM agency');
    //debug('DATA length: '+DATA.length);
    //debug('agency-all done.');
    return DATA;
}
module.exports = {
  get
}

