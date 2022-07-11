const debug=require('debug')('debug');
//debug('trips-by-route-id start...');
const db = require('./db');
async function get(routeid = 0) {
    //debug('routeid: '+routeid);
    const QUERY=`SELECT trips.service_id,trips.trip_id FROM trips WHERE trips.route_id='${routeid}';`
    //debug('QUERY: '+QUERY);
    const trips = await db.query(QUERY);
    debug('trips-by-route-id trips.length: '+trips.length);
    return trips;
}
      
module.exports = {
    get
}
//debug('trips-by-route-id done.');
