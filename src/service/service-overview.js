const Debug=require('debug')('service-overview');
const Mapping=require('../utils/mapping');
Debug('service-overview start...');

const db = require('./db');

async function getServiceOverview() {

    const Query='SELECT agency_id, route_id, route_short_name FROM routes';
    //Debug('Query: '+Query);
    const AryRoutes=await db.query(Query);

    /*create map*/
    let MapRoutes=new Map()
    /*get routes*/
    const RouteCount=AryRoutes.length;
    //Debug('RouteCount: '+RouteCount);
    /*interate through routes*/
    for(var i=0;i<RouteCount;i++){
    //TODO CLEAN UP for(var i=0;i<20;i++){
	////Debug('i: '+i);
	let agencyId=null;
	let routeId=null;
	let routeShortName=null;
	if('agency_id' in AryRoutes[i]){
	    agencyId=AryRoutes[i].agency_id;
	    ////Debug('agencyId: '+agencyId);
	}
	if('route_id' in AryRoutes[i]){
	    routeId=AryRoutes[i].route_id;
	    ////Debug('routeId: '+routeId);
	}
	if('route_short_name' in AryRoutes[i]){
	    routeShortName=AryRoutes[i].route_short_name;
	    ////Debug('routeShortName: '+routeShortName);
	}
	Mapping.updateMap(agencyId,routeId,routeShortName,MapRoutes);
    }
    ////Debug('MapRoutes size: '+MapRoutes.size);
    const objMap=Mapping.times2Obj(MapRoutes);
    Debug('objMap count: '+Object.keys(objMap).length);
    //TODO gap between agency count and objMap count due to unused agencies possible
    return objMap;
}
      
module.exports = {
  getServiceOverview
}
Debug('service-overview done.');
