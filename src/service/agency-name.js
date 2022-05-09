const DEBUG=require('debug')('agency-name');
DEBUG('agency-name start...');

const db = require('./db');

async function getAgencyName(routeid = 0) {
    DEBUG('routeid: '+routeid);
    const QUERY=`SELECT agency.agency_name FROM agency,routes WHERE routes.route_id='${routeid}' AND routes.agency_id=agency.agency_id;`
    DEBUG('QUERY: '+QUERY);
    const AGENCYNAME = await db.query(QUERY);
    DEBUG('AGENCYNAME: '+AGENCYNAME[0].agency_name);
    return AGENCYNAME;
}
      
module.exports = {
  getAgencyName
}
DEBUG('agency-name done.');
