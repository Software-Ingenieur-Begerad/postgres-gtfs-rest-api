const DEBUG=require('debug')('trip-head-sign');
DEBUG('trip-head-sign start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTripHeadSignBad(tripshortname = 0) {
    DEBUG('tripshortname: '+tripshortname);
    const TRIPHEADSIGN = await db.query(
	`SELECT trip_headsign FROM trips WHERE trip_short_name=${tripshortname};`);
    DEBUG('TRIPHEADSIGN: '+TRIPHEADSIGN);
    return TRIPHEADSIGN;
}

async function getTripHeadSignBad2(tripshortname = 0) {
    DEBUG('tripshortname: '+tripshortname);
    const TRIPHEADSIGN = await db.query(
	"SELECT trip_headsign FROM trips WHERE trip_short_name=?",
    [tripshortname]);
    DEBUG('TRIPHEADSIGN: '+TRIPHEADSIGN);
    return TRIPHEADSIGN;
}
      
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
DEBUG('trip-head-sign done.');
