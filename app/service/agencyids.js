const db = require('./db');
async function get() {
    const DATA = await db.query(
	'SELECT agency.agency_id,agency.agency_name FROM agency');
    return DATA;
}
module.exports = {
  get
}
