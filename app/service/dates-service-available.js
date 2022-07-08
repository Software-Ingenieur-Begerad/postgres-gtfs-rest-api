const debug=require('debug')('debug');
debug('datesServiceAvailable start...');
const db = require('./db');
const date=require('../utils/date');
const gtfs=require('../utils/gtfs');
const mapping=require('../utils/mapping');
async function get(serviceId = 0) {
    debug('datesServiceAvailable serviceId: '+serviceId);
    const query=`SELECT * FROM calendar WHERE service_id='${serviceId}';`;
    debug('datesServiceAvailable query: '+query);
    const dataService = await db.query(query);
    debug('datesServiceAvailable dataService.length: '+dataService.length);
    debug('datesServiceAvailable service_id: '+dataService[0].service_id);
    const monday=dataService[0].monday;
    debug('monday: '+monday);
    const tuesday=dataService[0].tuesday;
    debug('tuesday: '+tuesday);
    const wednesday=dataService[0].wednesday;
    debug('wednesday: '+wednesday);
    const thursday=dataService[0].thursday;
    debug('thursday: '+thursday);
    const friday=dataService[0].friday;
    debug('datesServiceAvailable friday: '+friday);
    const saturday=dataService[0].saturday;
    debug('datesServiceAvailable saturday: '+saturday);
    const sunday=dataService[0].sunday;
    debug('datesServiceAvailable sunday: '+sunday);
    const start_date=dataService[0].start_date;
    debug('start_date: '+start_date);
    const dateStart=gtfs.gtfsDate2NodeDate(start_date);
    debug('dateStart: '+dateStart);
    const end_date=dataService[0].end_date;
    debug('end_date: '+end_date);
    const dateEnd=gtfs.gtfsDate2NodeDate(end_date);
    debug('dateEnd: '+dateEnd);
    let dateNext=new Date(dateStart);
    debug('dateNext: '+dateNext);
    const datesServiceAvailable=new Set();
    while(dateNext.getTime()<=dateEnd.getTime()){
	let weekday=dateNext.getDay();
	if((weekday===date.weekday.monday && monday) ||
	   (weekday===date.weekday.tuesday && tuesday) ||
	   (weekday===date.weekday.wednesday && wednesday) ||
	   (weekday===date.weekday.thursday && thursday) ||
	   (weekday===date.weekday.friday && friday) ||
	   (weekday===date.weekday.saturday && saturday) ||
	   (weekday===date.weekday.sunday && sunday)){
	    datesServiceAvailable.add(dateNext.getTime());
	}
	dateNext=new Date(dateNext.setDate(dateNext.getDate()+1));
    }
    debug('datesServiceAvailable size: '+datesServiceAvailable.size);
    return mapping.set2Array(datesServiceAvailable);
}
module.exports = {
  get
}
debug('datesServiceAvailable done.');
