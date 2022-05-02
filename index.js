const DEBUG=require('debug')('index');

DEBUG('index start...');
const APP=require('./src/app');

//TODO make port available via config
//set port
const PORT=parseInt(process.env.PORT, 10)||65535;
DEBUG('PORT: '+PORT)

//TODO make env available via config
//pass 'APP' to server
DEBUG('NODE_ENV: '+process.env.NODE_ENV);
if (process.env.NODE_ENV !== 'production') {
    APP.listen(PORT);
}else{
    //TODO add production mode
    DEBUG('TODO to production server');
}

DEBUG('index done..');
