const debug=require('debug')('debug');
debug('serviceAvailability start...');
const db = require('./db');
const date=require('../utils/date');
const gtfs=require('../utils/gtfs');
//TODO CLEANUP const mapping=require('../utils/mapping');
const datesServiceAvailable=require('./dates-service-available');
const datesServiceAdded=require('./dates-service-added');
const datesServiceRemoved=require('./dates-service-removed');
const mapping=require('../utils/mapping');
async function get(serviceId = 0) {
    debug('serviceAvailability serviceId: '+serviceId);
    const available=datesServiceAvailable.get(serviceId);
    //debug('serviceAvailability available: '+available.length);
    const added=datesServiceAdded.get(serviceId);
    const removed=datesServiceRemoved.get(serviceId);
    //debug('serviceAvailability removed: '+removed.length);
    //const setAvail=new Set(available);
    //debug('serviceAvailability setAvail: '+setAvail.size);
    const datesAll=await Promise.all([available,added,removed])
    //debug('serviceAvailability datesAll.length: '+datesAll.length);
    const setAvail=new Set(datesAll[0]);
    debug('serviceAvailability setAvail.size: '+setAvail.size);
    //remove dates from service
    datesAll[2].forEach(rmEntry=>setAvail.delete(rmEntry));
    debug('serviceAvailability setAvailWithRmed.size: '+setAvail.size);
    //add dates to service
    const setAvailWithAdded = new Set([...setAvail, ...new Set(datesAll[1])]);
    debug('serviceAvailability setAvailWithAdded.size: '+setAvailWithAdded.size);
    return mapping.set2Array(setAvailWithAdded);
};
module.exports = {
  get
}
debug('serviceAvailability done.');
