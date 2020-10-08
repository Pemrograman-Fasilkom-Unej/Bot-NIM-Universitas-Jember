// database config is depend on node environment
// configs can be found on ~/knexfile.js
const path = require('path');
const environment = process.env.NODE_ENV || 'development'; // todo : delete this shit
const config = require(path.resolve(__dirname, '../../knexfile'))[environment];

module.exports = require('knex')(config);