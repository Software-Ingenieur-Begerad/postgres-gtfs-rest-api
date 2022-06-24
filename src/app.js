const DEBUG=require('debug')('app');
DEBUG('app start...');

require('dotenv').config();
const HELMET = require('helmet');
const COMPRESSION = require('compression');

const EXPRESS = require("express");
const CORS = require("cors");

//get API root with alive msg
const ROOTROUTER = require('./route/root');

//get array[0]['count'] int value with the overall number of tables in public schema
const tableCount = require('./route/table-count');
const tableCalendarDatesCount = require('./route/table-calendar-dates-count');
const tableAgencyCount = require('./route/table-agency-count');
const tableRoutesCount = require('./route/table-routes-count');
const tableShapesCount = require('./route/table-shapes-count');
const tableTripsCount = require('./route/table-trips-count');
const tableCalendarCount = require('./route/table-calendar-count');
const tableFrequenciesCount = require('./route/table-frequencies-count');
const tableLevelsCount = require('./route/table-levels-count');
//get array[i]['table_name'] string value with all table names in public schema
const tableNames = require('./route/table-names');
//get agencies using pagination
const AGENCYROUTER = require('./route/agency');

//get all agencies
const AGENCYALLROUTER = require('./route/agency-all');

//get agency_name from route_id
const AGENCYNAMEROUTER = require('./route/agency-name');

//get agency_url from route_id
const AGENCYURLROUTER = require('./route/agency-url');

//get all stops
const STOPSALLROUTER = require('./route/stops-all');

//get all frequencies
const FREQUENCIESALLROUTER = require('./route/frequencies-all');

//get all routes
const ROUTESALLROUTER = require('./route/routes-all');

//get route_short_name from trip_short_name
const ROUTESHORTNAME = require('./route/route-short-name');

//get service by service_id
const ROUTESERVICE = require('./route/service');

//get all service days that belong to a certain route_short_name
const ROUTESERVICEDAYS = require('./route/servicedays');

//get all service with counts of routes
const ROUTESERVICEOVERVIEW = require('./route/service-overview');

//get number of routes belonging to the same agency_id
const ROUTECOUNT = require('./route/route-count');

//get trip_headsign from trip_short_name
const TRIPHEADSIGNROUTER = require('./route/trip-headsign');

//get all trips that belong to a certain route_short_name
const TRIPSROUTER = require('./route/trips');

//get number of trips belonging to the same agency_id
const TRIPCOUNT = require('./route/trip-count');

//TODO make this list available via config
//limit access to this origin list
let whitelist = [
    'http(s)://foo.bar'
];

const APP = EXPRESS();

//compress all routes
APP.use(COMPRESSION());

//protect against vulnerabilities
APP.use(HELMET());

//configure CORS
APP.use(CORS({
    origin: function(origin, callback){
        // allow requests with no origin
        DEBUG('origin: '+origin)
        if(!origin){
            return callback(null, true);
        }
        if(whitelist.indexOf(origin) === -1){
            let message = 'The CORS policy for this origin does not allow access from the particular origin: '+origin;
            return callback(new Error(message), false);
        }
        DEBUG('origin: '+origin+' allowed by CORS');
        return callback(null, true);
    }
}));

APP.use('/', ROOTROUTER);
APP.use('/agency', AGENCYROUTER);
APP.use('/agency-all', AGENCYALLROUTER);
APP.use('/agency-name', AGENCYNAMEROUTER);
APP.use('/agency-url', AGENCYURLROUTER);
APP.use('/stops-all', STOPSALLROUTER);
APP.use('/frequencies-all', FREQUENCIESALLROUTER);
APP.use('/routes-all', ROUTESALLROUTER);
APP.use('/route-count', ROUTECOUNT);
APP.use('/route-short-name', ROUTESHORTNAME);
APP.use('/trip-count', TRIPCOUNT);
APP.use('/trip-headsign', TRIPHEADSIGNROUTER);
APP.use('/trips', TRIPSROUTER);
APP.use('/service', ROUTESERVICE);
APP.use('/servicedays', ROUTESERVICEDAYS);
APP.use('/service-overview', ROUTESERVICEOVERVIEW);
APP.use('/table-calendar-dates-count', tableCalendarDatesCount);
APP.use('/table-agency-count', tableAgencyCount);
APP.use('/table-routes-count', tableRoutesCount);
APP.use('/table-shapes-count', tableShapesCount);
APP.use('/table-trips-count', tableTripsCount);
APP.use('/table-calendar-count', tableCalendarCount);
APP.use('/table-frequencies-count', tableFrequenciesCount);
APP.use('/table-levels-count', tableLevelsCount);
APP.use('/table-count', tableCount);
APP.use('/table-names', tableNames);
module.exports=APP;
DEBUG('app done..');
