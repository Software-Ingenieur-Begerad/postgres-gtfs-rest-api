const debug=require('debug')('debug');
//debug('services-by-route-id start...');
const db = require('./db');
const mapping=require('../utils/mapping');
async function get(routeid = 0) {
    //debug('routeid: '+routeid);
    const QUERY=`SELECT trips.service_id FROM trips WHERE trips.route_id='${routeid}';`
    //debug('QUERY: '+QUERY);
    const aryServiceIds = await db.query(QUERY);
    debug('services-by-route-id aryServiceIds.length: '+aryServiceIds.length);
    const setServiceIds=new Set();
    aryServiceIds.forEach(value=>setServiceIds.add(value.service_id));
    return mapping.set2Array(setServiceIds);
    debug('services-by-route-id setServiceIds.size: '+setServiceIds.size);
    return aryServiceIds;
}
      
module.exports = {
    get
}
//debug('services-by-route-id done.');
