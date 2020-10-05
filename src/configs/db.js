// database config is depend on node environment
// configs can be found on ~/knexfile.js
const environment = process.env.NODE_ENV;
const config = require('../../knexfile')[environment];

module.exports = require('knex')(config);