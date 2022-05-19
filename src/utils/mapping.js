const debug=require('debug')('mapping');

function updateMap(time,tripId,tripShortName,map){
    //debug('time: '+time);
    //time map empty
    if(map.size===0){
	//debug('map.size: '+map.size);
	//create trip map
	let mapTrips=new Map();
	//add trip to trip map
	addTrip(tripId,tripShortName,mapTrips);
	//add time to time map
	map.set(time,mapTrips);
	//debug('map.size: '+map.size);
    }//time map NOT empty
    else{
	//debug('map.size: '+map.size);
	//time not present yet
	if(!map.has(time)){
	    //debug('map has not: '+time);
	    //create trips map
	    let mapTrips=new Map();
	    //add trip to trip map
	    addTrip(tripId,tripShortName,mapTrips);
	    //add time to time map
	    map.set(time,mapTrips);
	    //debug('map.size: '+map.size);
	}
	//time already present
	else{
	    //debug('map has: '+time);
	    let mapTrips=map.get(time);
	    //debug('mapTrips.size: '+mapTrips.size);
	    //TODO Does it matter to override existing trips?
	    //add trip to trip map
	    addTrip(tripId,tripShortName,mapTrips);
	}
    }
}

function addTrip(tripId, tripShortName, map){
    map.set(tripId,tripShortName);
    //debug('map.size: '+map.size);
}

module.exports={
    updateMap
};
