const DEBUG=require('debug')('agency');
DEBUG('agency start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    //const offset = helper.getOffset(page, config.listPerPage);
    const DATA = await db.query(
	'SELECT * FROM agency');
    DEBUG('DATA length: '+DATA.length);
    //TODO if DATA {message	"getaddrinfo ENOTFOUND <HOST like acer>"} then handle
    return DATA;
}

module.exports = {
  get
}
DEBUG('agency done.');
