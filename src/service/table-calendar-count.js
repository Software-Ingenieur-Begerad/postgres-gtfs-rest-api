const DEBUG=require('debug')('table-calendar-count');
DEBUG('table-calendar-count start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    const DATA = await db.query(
	`SELECT count(*) FROM calendar`);
    DEBUG('DATA length: '+DATA.length);
    //TODO if DATA {message	"getaddrinfo ENOTFOUND <HOST like acer>"} then handle
    return DATA;
}

module.exports = {
  get
}
DEBUG('table-calendar-count done.');
