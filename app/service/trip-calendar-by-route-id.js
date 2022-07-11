const debug=require('debug')('debug');
//debug('trip-calendar-by-route-id start...');
const db = require('./db');
const tripsByRouteId=require('./trips-by-route-id');
const serviceAvailability=require('./service-availability');
const mapping=require('../utils/mapping');
async function get(routeId = 0) {
    const setServiceAbility=new Set();
    debug('trip-calendar-by-route-id routeId: '+routeId);
    const aryTripsByRouteId=await tripsByRouteId.get(routeId);
    debug('trip-calendar-by-route-id aryTripsByRouteId.length: '+aryTripsByRouteId.length);
    const mapServiceIds=new Map();
    debug('trip-calendar-by-route-id mapServiceIds.size: '+mapServiceIds.size);
    //set map
    for(var i=0;i<aryTripsByRouteId.length;i++){
	const tripId=aryTripsByRouteId[i].trip_id;
	//debug('trip-calendar-by-route-id tripId: '+tripId);
	const serviceId=aryTripsByRouteId[i].service_id;
	//debug('trip-calendar-by-route-id serviceId: '+serviceId);
	if(!mapServiceIds.has(serviceId)){
	    const arySA=await serviceAvailability.get(serviceId);
	    mapServiceIds.set(serviceId,arySA);
	}
    };
    debug('trip-calendar-by-route-id mapServiceIds.size: '+mapServiceIds.size);
    //TODO iterate over all trip_id values
    //TODO increment a day if a trip has a service that day
    
    const today=new Date();
    debug('trip-calendar-by-route-id today: '+today);
    const todayTs=today.getTime();
    debug('trip-calendar-by-route-id todayTs: '+todayTs);
    const todayZeroH=today.setHours(0,0,0,0);
    debug('trip-calendar-by-route-id todayZeroH: '+todayZeroH);
    const todayZeroH2=new Date(new Date().toDateString());
    debug('trip-calendar-by-route-id todayZeroH2: '+todayZeroH2);
    const todayZeroH2Ts=todayZeroH2.getTime();
    debug('trip-calendar-by-route-id todayZeroH2Ts: '+todayZeroH2Ts);
    let before7DaysDate=new Date(todayZeroH2);
    debug('trip-calendar-by-route-id before7DaysDate: '+before7DaysDate);
    before7DaysDate=new Date(before7DaysDate.setDate(before7DaysDate.getDate() - 7));
    debug('trip-calendar-by-route-id before7DaysDate: '+before7DaysDate);
    let after7DaysDate=new Date(todayZeroH2);
    debug('trip-calendar-by-route-id after7DaysDate: '+after7DaysDate);
    after7DaysDate=new Date(after7DaysDate.setDate(after7DaysDate.getDate() + 7));
    debug('trip-calendar-by-route-id after7DaysDate: '+after7DaysDate);
    /*TODO
    const setServiceIds=new Set();
    aryTripsByRouteId.forEach(value=>setServiceIds.add(value.service_id));
    //debug('trip-calendar-by-route-id setServiceIds.size: '+setServiceIds.size);
    for(value of setServiceIds.values()) {
	const arySA=await serviceAvailability.get(value);
	//debug('trip-calendar-by-route-id arySA.length: '+arySA.length);
	setServiceAbility.add(arySA);
    }
    debug('trip-calendar-by-route-id setServiceAbility.size: '+setServiceAbility.size);
    return mapping.set2Array(setServiceAbility);
    */
    return [];

};      
module.exports = {
    get
}
//debug('trip-calendar-by-route-id done.');
