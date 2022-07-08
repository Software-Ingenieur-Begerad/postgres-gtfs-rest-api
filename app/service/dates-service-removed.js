const debug=require('debug')('debug');
debug('datesServiceRemoved start...');
const db = require('./db');
const date=require('../utils/date');
const gtfs=require('../utils/gtfs');
async function get(serviceId = 0) {
    debug('datesServiceRemoved serviceId: '+serviceId);
    const query=`SELECT calendar_dates.date,calendar_dates.exception_type FROM calendar,calendar_dates WHERE calendar.service_id=calendar_dates.service_id AND calendar.service_id='${serviceId}' and calendar_dates.exception_type='2';`;
    //debug('datesServiceRemoved query: '+query);
    const data = await db.query(query);
    //debug('datesServiceRemoved data.length: '+data.length);
    //debug('datesServiceRemoved [0]: '+JSON.stringify(data[0]));
    const dates=data.map(gtfs.getDatesFromCalendarDates);
    debug('datesServiceRemoved dates.length: '+dates.length);
    return dates;
}
module.exports = {
  get
}
debug('datesServiceRemoved done.');
