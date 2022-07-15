const debug=require('debug')('debug');
const db = require('./db');
const routesByAgencyId=require('./routes-by-agency-id');
const tripCalendarByRouteId=require('./trip-calendar-by-route-id');
const mapping=require('../utils/mapping');
const calendar=require('../utils/calendar');
async function get(agencyId = 0) {
    //debug('trip-calendar-by-agency-id start...');
    //debug('trip-calendar-by-agency-id agencyId: '+agencyId);

    //get calendar map
    const mapCalendar=calendar.getCalendarMap();
    //debug('trip-calendar-by-agency-id mapCalendar.size: '+mapCalendar.size);

    //get routes array
    const aryRoutes=await routesByAgencyId.get(agencyId);
    //debug('trip-calendar-by-agency-id aryRoutes.length: '+aryRoutes.length);

    //init trip calendar map
    const mapTripCalendar=new Map();
    mapCalendar.forEach((value,key)=>{
	//debug('trip-calendar-by-agency-id mapCalendar key: '+key+', value: '+value);
	mapTripCalendar.set(value,0);
    });
    //debug('trip-calendar-by-agency-id mapTripCalendar.size: '+mapTripCalendar.size);

    //set trip calendar map
    //iterate over routes
    for(var i=0;i<aryRoutes.length;i++){
	const routeId=aryRoutes[i].route_id;
	//debug('trip-calendar-by-agency-id routeId: '+routeId);
	const trips=await tripCalendarByRouteId.get(routeId);
	//debug('trip-calendar-by-agency-id trips: '+Object.keys(trips).length);
	for (const key in trips) {
	    //debug('trip-calendar-by-agency-id key:'+key+', value:'+trips[key]);
	    let tripCalendarValue=mapTripCalendar.get(parseInt(key,10));
	    //debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
	    if(tripCalendarValue!==undefined){
		tripCalendarValue=tripCalendarValue+trips[key];
		//debug('trip-calendar-by-agency-id tripCalendarValue: '+tripCalendarValue);
		mapTripCalendar.set(parseInt(key,10),tripCalendarValue);
	    }else{
		debug('trip-calendar-by-agency-id tripCalendarValue is UNDEFINED');
	    }
	}
    }
    //debug('trip-calendar-by-route-id done.');
    return mapping.map2Obj(mapTripCalendar);
};      
module.exports = {
    get
}
