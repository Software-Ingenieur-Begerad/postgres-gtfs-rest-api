const DEBUG=require('debug')('agency-url');
DEBUG('agency-url start...');

const db = require('./db');

async function getAgencyUrl(routeid = 0) {
    DEBUG('routeid: '+routeid);
    const QUERY=`SELECT agency.agency_url FROM agency,routes WHERE routes.route_id='${routeid}' AND routes.agency_id=agency.agency_id;`
    DEBUG('QUERY: '+QUERY);
    const AGENCYURL = await db.query(QUERY);
    DEBUG('AGENCYURL: '+AGENCYURL[0].agency_url);
    return AGENCYURL;
}
      
module.exports = {
  getAgencyUrl
}
DEBUG('agency-url done.');
