const debug=require('debug')('debug');
//debug('service-ability-by-route-id start...');
const db = require('./db');
const tripsByRouteId=require('./trips-by-route-id');
const serviceAvailability=require('./service-availability');
const mapServiceAbility=new Map();
const setServiceAbility=new Set();
const mapping=require('../utils/mapping');
async function get(routeId = 0) {
    //debug('service-ability-by-route-id routeId: '+routeId);
    const aryTripsByRouteId=await tripsByRouteId.get(routeId);
    //debug('service-ability-by-route-id aryTripsByRouteId.length: '+aryTripsByRouteId.length);
    const setServiceIds=new Set();
    aryTripsByRouteId.forEach(value=>setServiceIds.add(value.service_id));
    //debug('service-ability-by-route-id setServiceIds.size: '+setServiceIds.size);
    for(value of setServiceIds.values()) {
	const arySA=await serviceAvailability.get(value);
	//debug('service-ability-by-route-id arySA.length: '+arySA.length);
	setServiceAbility.add(arySA);
    }
    debug('service-ability-by-route-id setServiceAbility.size: '+setServiceAbility.size);
    return mapping.set2Array(setServiceAbility);
};      
module.exports = {
    get
}
//debug('service-ability-by-route-id done.');
