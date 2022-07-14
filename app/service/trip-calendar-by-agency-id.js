const debug=require('debug')('debug');
const db = require('./db');
const routesByAgencyId=require('./routes-by-agency-id');
const tripCalendarByRouteId=require('./trip-calendar-by-route-id');
const mapping=require('../utils/mapping');
const calendar=require('../utils/calendar');
async function get(agencyId = 0) {
    //debug('trip-calendar-by-agency-id start...');
    debug('trip-calendar-by-agency-id agencyId: '+agencyId);

    //get calendar map
    const mapCalendar=calendar.getCalendarMap();
    debug('trip-calendar-by-agency-id mapCalendar.size: '+mapCalendar.size);

    //get routes array
    const aryRoutes=await routesByAgencyId.get(agencyId);
    debug('trip-calendar-by-agency-id aryRoutes.length: '
	  +aryRoutes.length);

    //init trip calendar map
    const mapTripCalendar=new Map();
    mapCalendar.forEach((value,key)=>{
	debug('trip-calendar-by-agency-id mapCalendar key: '+key+', value: '+value);
	mapTripCalendar.set(value,0);
    });
    debug('trip-calendar-by-agency-id mapTripCalendar.size: '+mapTripCalendar.size);
    mapTripCalendar.forEach((value,key)=>{
	debug('trip-calendar-by-agency-id mapTripCalendar key: '+key+', value: '+value);
    });

    //set trip calendar map
    //iterate over routes
    //TODO for(var i=0;i<aryRoutes.length;i++){
    for(var i=0;i<2;i++){
	debug('trip-calendar-by-agency-id i: '+i);
	const routeId=aryRoutes[i].route_id;
	debug('trip-calendar-by-agency-id routeId: '+routeId);
	const trips=await tripCalendarByRouteId.get(routeId);
	debug('trip-calendar-by-agency-id trips.size: '+Object.keys(trips).length);
	for (const key in trips) {
	    debug('trip-calendar-by-agency-id key:'+key+', value:'+trips[key]);
	    let tripCalendarValue=mapTripCalendar.get(key);
	    debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
	    if(tripCalendarValue!==undefined){
		tripCalendarValue+=trips[key];
		debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
		mapTripCalendar.set(key,tripCalendarValue);
	    }else{
		debug('trip-calendar-by-agency-id tripCalendarValue is UNDEFINED');
	    }
	}
	/*
	trips.forEach((value,key)=>{
	    debug('trip-calendar-by-agency-id value: '+value);
	    let tripCalendarValue=mapTripCalendar.get(key);
	    debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
	    tripCalendarValue+=value;
	    debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
	    mapTripCalendar.set(key,tripCalendarValue);
	});
	*/
    }
    mapTripCalendar.forEach((value,key)=>{
	debug('trip-calendar-by-route-id mapTripCalendar key: '+key+', value: '+value);
    });
    //debug('trip-calendar-by-route-id done.');
    return mapping.map2Obj(mapTripCalendar);
};      
module.exports = {
    get
}
