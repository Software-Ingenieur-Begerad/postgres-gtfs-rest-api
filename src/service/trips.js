const DEBUG=require('debug')('trips');
DEBUG('trips start...');

const db = require('./db');

async function getTrips(routeshortname = 0) {
    DEBUG('routeshortname: '+routeshortname);
    const QUERY=`select agency.agency_name, routes.route_short_name, routes.agency_id, trips.route_id, trips.service_id, trips.trip_id, trips.trip_short_name from agency, trips, routes where agency.agency_id=routes.agency_id and trips.route_id=routes.route_id and routes.route_short_name='${routeshortname}';`
    DEBUG('QUERY: '+QUERY);
    const TRIPS = await db.query(QUERY);
    DEBUG('TRIPS.length: '+TRIPS.length);
    DEBUG('TRIPS[0].agency_name: '+TRIPS[0].agency_name);
    return TRIPS;
}
      
module.exports = {
  getTrips
}
DEBUG('trips done.');
