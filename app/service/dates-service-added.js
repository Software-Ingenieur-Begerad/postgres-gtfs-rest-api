const debug=require('debug')('debug');
//debug('datesServiceAdded start...');
const db = require('./db');
const date=require('../utils/date');
const gtfs=require('../utils/gtfs');
async function get(serviceId = 0) {
    //debug('datesServiceAdded serviceId: '+serviceId);
    const query=`SELECT calendar_dates.date,calendar_dates.exception_type FROM calendar,calendar_dates WHERE calendar.service_id=calendar_dates.service_id AND calendar.service_id='${serviceId}' and calendar_dates.exception_type='1';`;
    //debug('datesServiceAdded query: '+query);
    const data = await db.query(query);
    //debug('datesServiceAdded data.length: '+data.length);
    //debug('datesServiceAdded [0]: '+JSON.stringify(data[0]));
    const dates=data.map(value=>gtfs.getDatesFromCalendarDates(value).getTime());
    //debug('datesServiceAdded dates.length: '+dates.length);
    return dates;
}
module.exports = {
  get
}
debug('datesServiceAdded done.');
