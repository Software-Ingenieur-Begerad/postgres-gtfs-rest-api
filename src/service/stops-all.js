const DEBUG=require('debug')('stops');
DEBUG('stops start...');

const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function get() {
    //const offset = helper.getOffset(page, config.listPerPage);
    const DATA = await db.query(
	'SELECT * FROM stops');
    DEBUG('DATA length: '+DATA.length);
    //TODO if DATA {message	"getaddrinfo ENOTFOUND <HOST like acer>"} then handle
    return DATA;
}

module.exports = {
  get
}
DEBUG('stops done.');
