const DEBUG=require('debug')('debug');
DEBUG('table-names start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    const DATA = await db.query(
	`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`);
    DEBUG('DATA length: '+DATA.length);
    //TODO if DATA {message	"getaddrinfo ENOTFOUND <HOST like acer>"} then handle
    return DATA;
}

module.exports = {
  get
}
DEBUG('table-names done.');
