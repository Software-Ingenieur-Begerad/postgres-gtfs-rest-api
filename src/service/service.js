const DEBUG=require('debug')('service');
DEBUG('service start...');

const db = require('./db');

async function getService(serviceid = 0) {
    DEBUG('serviceid: '+serviceid);
    const QUERY=`select * from calendar where service_id='${serviceid}';`
    DEBUG('QUERY: '+QUERY);
    const SERVICE = await db.query(QUERY);
    DEBUG('SERVICE: '+SERVICE[0].service_id);
    return SERVICE;
}
      
module.exports = {
  getService
}
DEBUG('service done.');
