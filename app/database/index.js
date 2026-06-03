const DB_CONFIG = require('./config');

const pg = require('pg');

const { Client } = pg;

const connection = new Client(DB_CONFIG);

module.exports = connection;
