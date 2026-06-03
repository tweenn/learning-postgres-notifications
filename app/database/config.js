const config = require('config');

const USER = config.get('database.user') ?? '';
const PASSWORD = config.get('database.password') ?? '';
const HOST = config.get('database.host') ?? '';
const PORT = Number.parseInt(config.get('database.port') ?? '');
const DATABASE = config.get('database.database') ?? '';
const SSL = config.get('database.ssl') ?? '';

module.exports = {
	user: USER,
	password: PASSWORD,
	host: HOST,
	port: PORT,
	database: DATABASE,
	ssl: SSL === 'true'
};