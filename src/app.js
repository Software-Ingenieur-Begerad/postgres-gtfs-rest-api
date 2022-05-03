const DEBUG=require('debug')('app');
DEBUG('index start...');

require('dotenv').config();
const HELMET = require('helmet');
const COMPRESSION = require('compression');

const EXPRESS = require("express");
const CORS = require("cors");
const ROOTROUTER = require('./route/root');
const AGENCYROUTER = require('./route/agency');
const AGENCYALLROUTER = require('./route/agency-all');
const STOPSALLROUTER = require('./route/stops-all');

//TODO make this list available via config
//limit access to this origin list
let whitelist = [
    'http://localhost:8080',
    'http://localhost:8081'
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
APP.use('/stops-all', STOPSALLROUTER);

module.exports=APP;
DEBUG('index done..');
