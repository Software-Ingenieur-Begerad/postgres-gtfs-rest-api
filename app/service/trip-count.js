const DEBUG=require('debug')('trip-count');
DEBUG('trip-count start...');

const db = require('./db');

async function getTripCount(agencyid = 0) {
    DEBUG('agencyid: '+agencyid);
    const QUERY=`SELECT route_id FROM routes WHERE agency_id='${agencyid}';`
    //DEBUG('QUERY: '+QUERY);
    const res=await db.query(QUERY);
    let tripsCount=0;
    if(res){
	const len=res.length
	//DEBUG('len: '+len);
	for(var i=0;i<len;i++){
	    //DEBUG('i: '+i);
	    const objRouteId=res[i];
	    //DEBUG('objRouteId: '+JSON.stringify(objRouteId));
	    const routeId=objRouteId.route_id;
	    //DEBUG('routeId: '+routeId);
	    const QUERY_TRIPS=`SELECT trip_id FROM trips WHERE route_id='${routeId}';`
	    //DEBUG('QUERY_TRIPS: '+QUERY_TRIPS);
	    const resTrips=await db.query(QUERY_TRIPS);
	    if(resTrips){
		const lenTrips=resTrips.length;
		//DEBUG('lenTrips: '+lenTrips);
		tripsCount+=lenTrips;
		//DEBUG('tripsCount: '+tripsCount);
	    }else{
		//DEBUG('resTrips NOT available');
	    }
	};
    }else{
	//DEBUG('res NOT available');
    }
    /*TODO Does it matter if you return a variable or object?
    let objLen={};
    objLen["len"]=len;
    return objLen;
    */
    return tripsCount;
}
      
module.exports = {
  getTripCount
}
DEBUG('trip-count done.');
