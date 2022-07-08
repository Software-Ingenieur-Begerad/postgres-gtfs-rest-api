const DEBUG=require('debug')('index');
const HTTPS = require('https');
const FS = require('fs');

DEBUG('index start...');
const APP=require('./app/app');

//TODO make port available via config
//set port
const PORT=parseInt(process.env.PORT, 10)||65535;
DEBUG('PORT: '+PORT);

//TODO make env available via config
//pass 'APP' to server
DEBUG('NODE_ENV: '+process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    DEBUG('development mode');
    APP.listen(PORT);
}else{
    DEBUG('production mode');
    HTTPS.createServer({
	//TODO make key and cert available via config
        key: FS.readFileSync('./p'),
        cert: FS.readFileSync('./f')
    }, APP)
    .listen(PORT, ()=>DEBUG('listening on port '+PORT));
}

DEBUG('index done.');
