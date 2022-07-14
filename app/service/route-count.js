const debug=require('debug')('debug');
const db = require('./db');
async function get(agencyId = 0) {
    //debug('route-count start...');
    //debug('agencyId: '+agencyId);
    const QUERY=`SELECT routes.route_id FROM routes WHERE agency_id='${agencyId}';`
    //debug('QUERY: '+QUERY);
    const res=await db.query(QUERY);
    const len=res.length
    //debug('route-count len: '+len);
    //debug('route-count done.');
    return len;
}
      
module.exports = {
  get
}
