const DEBUG=require('debug')('table-trips-count');
DEBUG('table-trips-count start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    const DATA = await db.query(
	`SELECT count(*) FROM trips`);
    DEBUG('DATA length: '+DATA.length);
    //TODO if DATA {message	"getaddrinfo ENOTFOUND <HOST like acer>"} then handle
    return DATA;
}

module.exports = {
  get
}
DEBUG('table-trips-count done.');
