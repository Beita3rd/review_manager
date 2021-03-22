'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.HEROKU_POSTGRESQL_OLIVE_URL || 'postgres://postgres:postgres@localhost/review_manager'
 );

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};