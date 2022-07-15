const debug=require('debug')('debug');
const db = require('./db');
async function get(routeid = 0) {
    //debug('trips-by-route-id start...');
    //debug('routeid: '+routeid);
    const QUERY=`SELECT trips.service_id,trips.trip_id FROM trips WHERE trips.route_id='${routeid}';`
    //debug('QUERY: '+QUERY);
    const trips = await db.query(QUERY);
    //debug('trips-by-route-id trips.length: '+trips.length);
    //debug('trips-by-route-id done.');
    return trips;
}
module.exports = {
    get
}
