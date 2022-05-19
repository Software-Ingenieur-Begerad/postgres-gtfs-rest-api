const debug=require('debug')('servicedays');
const date=require('../utils/date');
const gtfs=require('../utils/gtfs');
const mapping=require('../utils/mapping');
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

	const queryServices=`select * from calendar where service_id='${serviceId}';`
	//debug('queryServices: '+queryServices);
	const dataServices = await db.query(queryServices);
	//debug('dataServices: '+dataServices[0].service_id);

	const monday=dataServices[0].monday;
	const tuesday=dataServices[0].tuesday;
	//debug('tuesday: '+tuesday);
	const wednesday=dataServices[0].wednesday;
	//debug('wednesday: '+wednesday);
	const thursday=dataServices[0].thursday;
	const friday=dataServices[0].friday;
	const saturday=dataServices[0].saturday;
	const sunday=dataServices[0].sunday;
	const start_date=dataServices[0].start_date;
	const dateStart=gtfs.gtfsDate2NodeDate(start_date);
	//debug('dateStart: '+dateStart);
	const end_date=dataServices[0].end_date;
	const dateEnd=gtfs.gtfsDate2NodeDate(end_date);
	//debug('dateEnd: '+dateEnd);
	let dateNext=new Date(dateStart);
	//debug('dateNext: '+dateNext);

	while(dateNext.getTime()<=dateEnd.getTime()){
	    let weekday=dateNext.getDay();
	    //debug('weekday: '+weekday);

	    if((weekday===date.weekday.monday && monday) ||
	       (weekday===date.weekday.tuesday && tuesday) ||
	       (weekday===date.weekday.wednesday && wednesday) ||
	       (weekday===date.weekday.thursday && thursday) ||
	       (weekday===date.weekday.friday && friday) ||
	       (weekday===date.weekday.saturday && saturday) ||
	       (weekday===date.weekday.sunday && sunday)){
		//update map
		mapping.updateMap(dateNext.getTime(),tripId,tripShortName,map);
	    }
	    dateNext=new Date(dateNext.setDate(dateNext.getDate()+1));
	}
    }

    debug('map.size: '+map.size);

    return map;
}
      
module.exports = {
  getServiceDays
}
debug('servicedays done.');
