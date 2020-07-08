const knex = require('knex');
const knexfile = require('../knexfile');

const enviroment = process.env.DB_ENV || 'development';
const knexConfig = knexfile[enviroment];

module.exports = knex(knexConfig);
