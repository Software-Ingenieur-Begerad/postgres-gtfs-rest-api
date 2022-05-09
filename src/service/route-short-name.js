const DEBUG=require('debug')('route-short-name');
DEBUG('route-short-name start...');

const db = require('./db');

async function getRouteShortName(tripshortname = 0) {
    DEBUG('tripshortname: '+tripshortname);
    const QUERY=`SELECT routes.route_short_name FROM routes, trips WHERE trips.trip_short_name='${tripshortname}' AND routes.route_id=trips.route_id;`
    DEBUG('QUERY: '+QUERY);
    const ROUTESHORTNAME = await db.query(QUERY);
    DEBUG('ROUTESHORTNAME: '+ROUTESHORTNAME[0].route_short_name);
    return ROUTESHORTNAME;
}
      
module.exports = {
  getRouteShortName
}
DEBUG('route-short-name done.');
