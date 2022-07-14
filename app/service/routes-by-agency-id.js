const debug=require('debug')('debug');
const db = require('./db');
async function get(agencyId = 0) {
    //debug('routes-by-agency-id start...');
    //debug('agencyId: '+agencyId);
    const QUERY=`SELECT routes.route_id FROM routes WHERE agency_id='${agencyId}';`
    //debug('QUERY: '+QUERY);
    const res=await db.query(QUERY);
    //debug('routes-by-agency-id done.');
    return res;
}
module.exports = {
  get
}
