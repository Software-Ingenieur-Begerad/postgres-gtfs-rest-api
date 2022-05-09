const DEBUG=require('debug')('trip-headsign');
DEBUG('trip-headsign start...');

const db = require('./db');

async function getTripHeadSign(tripshortname = 0) {
    DEBUG('tripshortname: '+tripshortname);
    const QUERY=`SELECT trip_headsign FROM trips WHERE trip_short_name='${tripshortname}';`;
    DEBUG('QUERY: '+QUERY);
    const TRIPHEADSIGN = await db.query(QUERY);
    DEBUG('TRIPHEADSIGN: '+TRIPHEADSIGN[0].trip_headsign);
    return TRIPHEADSIGN;
}
      
module.exports = {
  getTripHeadSign
}
DEBUG('trip-headsign done.');
