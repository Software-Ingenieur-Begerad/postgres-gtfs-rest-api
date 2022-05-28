const Debug=require('debug')('service-overview');
const Mapping=require('../utils/mapping');
Debug('service-overview start...');

const db = require('./db');

async function getServiceOverview() {

    const queryTrips='SELECT agency_id, route_id, route_short_name FROM routes';
    Debug('queryTrips: '+queryTrips);
    const AryData = await db.query(queryTrips);
    const len=AryData.length;
    Debug('AryData len: '+len);

    let MapRoutes=null;
    if('data' in AryData){
	/*get routes*/
	const AryRoutes=AryData.data;
	const RouteCount=AryRoutes.length;
	debug('RouteCount: '+RouteCount);
	/*create map*/
	MapRoutes=new Map();

	/*interate through routes*/
	//TODO CLEAN UP for(var i=0;i<RouteCount;i++){
	for(var i=0;i<2;i++){
	    debug('i: '+i);
	    let agencyId=null;
	    let routeId=null;
	    let routeShortName=null;
	    if('agency_id' in AryRoutes[i]){
		agencyId=AryRoutes[i].agency_id;
		debug('agencyId: '+agencyId);
	    }
	    if('route_id' in AryRoutes[i]){
		routeId=AryRoutes[i].route_id;
		debug('routeId: '+routeId);
	    }
	    if('route_short_name' in AryRoutes[i]){
		routeShortName=AryRoutes[i].route_short_name;
		debug('routeShortName: '+routeShortName);
	    }
	    Mapping.updateMap(agencyId,routeId,routeShortName,MapRoutes);

	}
	debug('MapRoutes size: '+MapRoutes.size);
    }
    const objMap=Mapping.times2Obj(MapRoutes);
    debug('objMap count: '+Object.keys(objMap).length);
    return objMap;
}
      
module.exports = {
  getServiceOverview
}
Debug('service-overview done.');
