const debug=require('debug')('debug');
debug('app start...');

require('dotenv').config();
const HELMET = require('helmet');
const COMPRESSION = require('compression');

const EXPRESS = require("express");
const CORS = require("cors");

//get API root with alive msg
const ROOTROUTER = require('./route/root');

//get overall number of tables in public schema as array[0]['count'] object
const tableCount = require('./route/table-count');

//get overall number of entries per table in public schema as array[0]['count'] object
const tableAgencyCount = require('./route/table-agency-count');
const tableCalendarCount = require('./route/table-calendar-count');
const tableCalendarDatesCount = require('./route/table-calendar-dates-count');
const tableFrequenciesCount = require('./route/table-frequencies-count');
const tableLevelsCount = require('./route/table-levels-count');
const tablePathwaysCount = require('./route/table-pathways-count');
const tableRoutesCount = require('./route/table-routes-count');
const tableShapesCount = require('./route/table-shapes-count');
const tableTransfersCount = require('./route/table-transfers-count');
const tableTripsCount = require('./route/table-trips-count');
const tableStopsCount = require('./route/table-stops-count');
const tableStopTimesCount = require('./route/table-stop-times-count');

//get all table names in public schema as array[i]['table_name'] object
const tableNames = require('./route/table-names');

//get all agency_id values
const agencyIds = require('./route/agencyids');

//get agencies using pagination
const AGENCYROUTER = require('./route/agency');

//get agency_name from route_id
const AGENCYNAMEROUTER = require('./route/agency-name');

//get agency_url from route_id
const AGENCYURLROUTER = require('./route/agency-url');

//get all entries from table
const AGENCYALLROUTER = require('./route/agency-all');
const FREQUENCIESALLROUTER = require('./route/frequencies-all');
const ROUTESALLROUTER = require('./route/routes-all');
const STOPSALLROUTER = require('./route/stops-all');

//get table entries using offset and limit
const agencyOsetLimit = require('./route/agency-oset-limit');
const agencyIdName = require('./route/agency-id-name');
const calendarOsetLimit = require('./route/calendar-oset-limit');
const calendarDatesOsetLimit = require('./route/calendar-dates-oset-limit');
const frequenciesOsetLimit = require('./route/frequencies-oset-limit');
const levelsOsetLimit = require('./route/levels-oset-limit');
const pathwaysOsetLimit = require('./route/pathways-oset-limit');
const routesOsetLimit = require('./route/routes-oset-limit');
const shapesOsetLimit = require('./route/shapes-oset-limit');
const stopsOsetLimit = require('./route/stops-oset-limit');
const stopTimesOsetLimit = require('./route/stop-times-oset-limit');
const transfersOsetLimit = require('./route/transfers-oset-limit');
const tripsOsetLimit = require('./route/trips-oset-limit');

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

//get routes belonging to the same agency_id
const routesByAgencyId = require('./route/routes-by-agency-id');

//get all service dates by service_id (including exceptions)
const serviceAvailability=require('./route/service-availability');

//get service availability for all trips belonging to the specified route_id
const serviceAbilityByRouteId=require('./route/service-ability-by-route-id');

//get array of dates when service is available by service_id
const datesServiceAvailable=require('./route/dates-service-available');

//get array of dates when service is added by service_id
const datesServiceAdded=require('./route/dates-service-added');

//get array of dates when service is removed by service_id
const datesServiceRemoved=require('./route/dates-service-removed');

//get trip_headsign from trip_short_name
const TRIPHEADSIGNROUTER = require('./route/trip-headsign');

//get all trips that belong to a certain route_short_name
const TRIPSROUTER = require('./route/trips');

//get all trips that belong to the specified route_id
const tripsByRouteId = require('./route/trips-by-route-id');

//get all trip counts for calendar dates that belong to the specified route_id
const tripCalendarByRouteId = require('./route/trip-calendar-by-route-id');

//get all trip counts for calendar dates that belong to the specified agency_id
const tripCalendarByAgencyId = require('./route/trip-calendar-by-agency-id');

//get all services that belong to the specified route_id
const servicesByRouteId = require('./route/services-by-route-id');

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
        debug('origin: '+origin)
        if(!origin){
            return callback(null, true);
        }
        if(whitelist.indexOf(origin) === -1){
            let message = 'The CORS policy for this origin does not allow access from the particular origin: '+origin;
            return callback(new Error(message), false);
        }
        debug('origin: '+origin+' allowed by CORS');
        return callback(null, true);
    }
}));
//api enable/disable?
APP.use('/', ROOTROUTER);
//agency
APP.use('/agency', AGENCYROUTER);
APP.use('/agency-name', AGENCYNAMEROUTER);
APP.use('/agency-url', AGENCYURLROUTER);
APP.use('/agencyids',agencyIds);

//get all entries from table
APP.use('/agency-all', AGENCYALLROUTER);
APP.use('/frequencies-all', FREQUENCIESALLROUTER);
APP.use('/routes-all', ROUTESALLROUTER);
APP.use('/stops-all', STOPSALLROUTER);

//offset and limit
APP.use('/agency-oset-limit',agencyOsetLimit);
APP.use('/agency-id-name-oset-limit',agencyIdName);
APP.use('/calendar-oset-limit',calendarOsetLimit);
APP.use('/calendar_dates-oset-limit',calendarDatesOsetLimit);
APP.use('/frequencies-oset-limit',frequenciesOsetLimit);
APP.use('/levels-oset-limit',levelsOsetLimit);
APP.use('/pathways-oset-limit',pathwaysOsetLimit);
APP.use('/routes-oset-limit',routesOsetLimit);
APP.use('/shapes-oset-limit',shapesOsetLimit);
APP.use('/stops-oset-limit',stopsOsetLimit);
APP.use('/stop_times-oset-limit',stopTimesOsetLimit);
APP.use('/transfers-oset-limit',transfersOsetLimit);
APP.use('/trips-oset-limit',tripsOsetLimit);
//get routes by agency_id
APP.use('/routes',routesByAgencyId);
//count
APP.use('/route-count', ROUTECOUNT);
APP.use('/trip-count', TRIPCOUNT);

APP.use('/route-short-name', ROUTESHORTNAME);
//trips
APP.use('/trip-headsign', TRIPHEADSIGNROUTER);
APP.use('/trips', TRIPSROUTER);
APP.use('/trips-by-route-id', tripsByRouteId);
APP.use('/trip-calendar-by-agency-id', tripCalendarByAgencyId);
APP.use('/trip-calendar-by-route-id', tripCalendarByRouteId);
//service
APP.use('/service', ROUTESERVICE);
APP.use('/servicedays', ROUTESERVICEDAYS);
APP.use('/service-overview', ROUTESERVICEOVERVIEW);
APP.use('/dates-service-available',datesServiceAvailable);
APP.use('/dates-service-added',datesServiceAdded);
APP.use('/dates-service-removed',datesServiceRemoved);
APP.use('/service-availability',serviceAvailability);
APP.use('/service-ability-by-route-id',serviceAbilityByRouteId);
APP.use('/services-by-route-id', servicesByRouteId);
//entry count
APP.use('/table-agency-count', tableAgencyCount);
APP.use('/table-calendar-count', tableCalendarCount);
APP.use('/table-calendar_dates-count', tableCalendarDatesCount);
APP.use('/table-frequencies-count', tableFrequenciesCount);
APP.use('/table-levels-count', tableLevelsCount);
APP.use('/table-pathways-count', tablePathwaysCount);
APP.use('/table-routes-count', tableRoutesCount);
APP.use('/table-shapes-count', tableShapesCount);
APP.use('/table-transfers-count', tableTransfersCount);
APP.use('/table-trips-count', tableTripsCount);
APP.use('/table-stops-count', tableStopsCount);
APP.use('/table-stop_times-count', tableStopTimesCount);
//number of tables
APP.use('/table-count', tableCount);
//array with name of all tables
APP.use('/table-names', tableNames);
module.exports=APP;
debug('app done..');
