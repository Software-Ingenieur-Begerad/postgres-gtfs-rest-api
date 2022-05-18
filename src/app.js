const DEBUG=require('debug')('app');
DEBUG('index start...');

require('dotenv').config();
const HELMET = require('helmet');
const COMPRESSION = require('compression');

const EXPRESS = require("express");
const CORS = require("cors");

//get API root with alive msg
const ROOTROUTER = require('./route/root');

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

//get trip_headsign from trip_short_name
const TRIPHEADSIGNROUTER = require('./route/trip-headsign');

//get all trips that belong to a certain route_short_name
const TRIPSROUTER = require('./route/trips');

//get route_short_name from trip_short_name
const ROUTESHORTNAME = require('./route/route-short-name');

//get service by service_id
const ROUTESERVICE = require('./route/service');

//get all service days that belong to a certain route_short_name
const ROUTESERVICEDAYS = require('./route/servicedays');

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
APP.use('/trip-headsign', TRIPHEADSIGNROUTER);
APP.use('/trips', TRIPSROUTER);
APP.use('/route-short-name', ROUTESHORTNAME);
APP.use('/service', ROUTESERVICE);
APP.use('/servicedays', ROUTESERVICEDAYS);

module.exports=APP;
DEBUG('index done..');
