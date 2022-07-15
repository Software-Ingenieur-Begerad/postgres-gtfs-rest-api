const debug=require('debug')('debug');
const db = require('./db');
const tripsByRouteId=require('./trips-by-route-id');
const serviceAvailability=require('./service-availability');
const mapping=require('../utils/mapping');
const calendar=require('../utils/calendar');
async function get(routeId = 0) {
    //debug('trip-calendar-by-route-id start...');
    //debug('trip-calendar-by-route-id routeId: '+routeId);

    //get calendar map
    const mapCalendar=calendar.getCalendarMap();
    //debug('trip-calendar-by-route-id mapCalendar.size: '+mapCalendar.size);

    //get trips array
    const aryTrips=await tripsByRouteId.get(routeId);
    //debug('trip-calendar-by-route-id aryTrips.length: '+aryTrips.length);

    //init services map
    const mapServices=new Map();
    //debug('trip-calendar-by-route-id mapServices.size: '+mapServices.size);

    //init trip calendar map
    const mapTripCalendar=new Map();
    mapCalendar.forEach((value,key)=>{
	//debug('trip-calendar-by-route-id mapCalendar key: '+key+', value: '+value);
	mapTripCalendar.set(value,0);
    });
    //debug('trip-calendar-by-route-id mapTripCalendar.size: '+mapTripCalendar.size);

    //set trip calendar map
    //iterate over trips
    for(var i=0;i<aryTrips.length;i++){
	const tripId=aryTrips[i].trip_id;
	//debug('trip-calendar-by-route-id tripId: '+tripId);
	const serviceId=aryTrips[i].service_id;
	//debug('trip-calendar-by-route-id serviceId: '+serviceId);

	//get service
	let service=[];
	if(!mapServices.has(serviceId)){
	    service=await serviceAvailability.get(serviceId);
	    mapServices.set(serviceId,service);
	}else{
	    service=mapServices.get(serviceId);
	}
	//debug('trip-calendar-by-route-id service.length: '+service.length);

	//iterate over service availabiltiy
	for(var j=0;j<service.length;j++){
	    //debug('trip-calendar-by-route-id service j: '+j);
	    //debug('trip-calendar-by-route-id service[j]: '+service[j]);
	    mapCalendar.forEach((value,key)=>{
		//debug('trip-calendar-by-route-id mapCalendar value: '+value);
		if(value===service[j]){
		    let tripCount=mapTripCalendar.get(value);
		    //debug('trip-calendar-by-route-id tripCount: '+tripCount);
		    tripCount++;
		    //debug('trip-calendar-by-route-id tripCount: '+tripCount);
		    mapTripCalendar.set(value,tripCount);
		}
	    });
	}
    }
    //debug('trip-calendar-by-route-id done.');
    return mapping.map2Obj(mapTripCalendar);
};      
module.exports = {
    get
}
