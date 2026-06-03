const dotenvFlow = require('dotenv-flow');
dotenvFlow.config();

const app = require('./app');
app();
