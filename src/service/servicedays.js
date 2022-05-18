const debug=require('debug')('servicedays');
debug('servicedays start...');

const db = require('./db');

async function getServiceDays(routeshortname = 0) {
    debug('routeshortname: '+routeshortname);
    const queryTrips=`select agency.agency_name, routes.route_short_name, routes.agency_id, trips.route_id, trips.service_id, trips.trip_id, trips.trip_short_name from agency, trips, routes where agency.agency_id=routes.agency_id and trips.route_id=routes.route_id and routes.route_short_name='${routeshortname}';`
    debug('queryTrips: '+queryTrips);
    const dataTrips = await db.query(queryTrips);
    const len=dataTrips.length;
    debug('len: '+len);

    const map=new Map();
    for(var i=0;i<len;i++){
	const tripId=dataTrips[i].trip_id;
	//debug('tripId: %s',tripId);

    	const tripShortName=dataTrips[i].trip_short_name;
	//debug('tripShortName: %s',tripShortName);
	const serviceId=dataTrips[i].service_id;
	//debug('serviceId: %s',serviceId);

	const queryServices='';
	const queryService=`http://localhost:65534/service?serviceid=${serviceId}`;
	/*
	//debug('queryService: '+queryService);
	dataServices = await axios.get(queryService);

	const monday=dataServices.data[0].monday;
	const tuesday=dataServices.data[0].tuesday;
	debug('tuesday: '+tuesday);
	*/

    }

    return dataTrips;
}
      
module.exports = {
  getServiceDays
}
debug('servicedays done.');
