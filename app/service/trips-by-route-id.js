const debug=require('debug')('debug');
debug('trips-by-route-id start...');
const db = require('./db');
async function get(routeid = 0) {
    //debug('routeid: '+routeid);
    const QUERY=`SELECT trips.trip_id FROM trips WHERE trips.route_id='${routeid}';`
    //debug('QUERY: '+QUERY);
    const tripsByRouteId = await db.query(QUERY);
    debug('tripsByRouteId.length: '+tripsByRouteId.length);
    return tripsByRouteId;
}
      
module.exports = {
    get
}
debug('trips-by-route-id done.');
