const DEBUG=require('debug')('config');
DEBUG('config start...');

require('dotenv').config();

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
      host: process.env.DB_HOST || 'host',
      port: process.env.DB_PORT || '5432',
      user: process.env.DB_USER || 'usr',
      password: process.env.DB_PASSWORD || 'key',
      database: process.env.DB_NAME || 'db',
  },
  listPerPage: process.env.LIST_PER_PAGE || 10,
};

DEBUG('config host: '+config.db.host);
DEBUG('config port: '+config.db.port);
module.exports = config;
DEBUG('config done.');
