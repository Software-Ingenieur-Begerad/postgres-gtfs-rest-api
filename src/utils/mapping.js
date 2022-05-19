const debug=require('debug')('mapping');

function updateMap(time,tripId,tripShortName,map){
    //debug('time: '+time);
    //time map empty
    if(map.size===0){
	//debug('map.size: '+map.size);
	//create trip map
	let mapTrips=new Map();
	//add trip to trip map
	createEntry(mapTrips,tripId,tripShortName);
	//add time to time map
	createEntry(map,time,mapTrips);
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
	    createEntry(mapTrips,tripId,tripShortName);
	    //add time to time map
	    createEntry(map,time,mapTrips);
	    //debug('map.size: '+map.size);
	}
	//time already present
	else{
	    //debug('map has: '+time);
	    let mapTrips=map.get(time);
	    //debug('mapTrips.size: '+mapTrips.size);
	    //TODO Does it matter to override existing trips?
	    //add trip to trip map
	    createEntry(mapTrips,tripId,tripShortName);
	}
    }
}

function createEntry(map, key, value){
    map.set(key,value);
}

function times2Array(map){
    let array=[];
    map.forEach((value,key)=>{
	//debug('key: '+key+', value: '+value);
	array.push(trips2Array(value));
	//debug('array: '+array);
    });
    return array;
}

function times2Obj(map){
    let object = {};
    map.forEach((value,key) => {
	trips2Obj(value);
	object[key] = trips2Obj(value);
    });
    //debug('JSON stringify object: '+JSON.stringify(object));
    return object;
}

function trips2Array(map){
    let array=Array.from(map.values());
    //debug('array: '+array);
    return array;
}

function trips2Obj(map){
    let object={};
    map.forEach((value,key)=>{
	//debug('key: '+key+', value: '+value);
	object[key]=value;
    });
    //debug('JSON stringify object: '+JSON.stringify(object));
    return object;
}

module.exports={
    updateMap,
    times2Obj,
    times2Array
};
