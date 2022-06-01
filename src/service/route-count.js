const DEBUG=require('debug')('route-count');
DEBUG('route-count start...');

const db = require('./db');

async function getRouteCount(agencyid = 0) {
    DEBUG('agencyid: '+agencyid);
    const QUERY=`SELECT route_id FROM routes WHERE agency_id='${agencyid}';`
    DEBUG('QUERY: '+QUERY);
    const res=await db.query(QUERY);
    const len=res.length
    DEBUG('len: '+len);
    /*TODO Does it matter if you return a variable or object?
    let objLen={};
    objLen["len"]=len;
    return objLen;
    */
    return len;
}
      
module.exports = {
  getRouteCount
}
DEBUG('route-count done.');
