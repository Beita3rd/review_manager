'use strict';
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  'postgres://postgres:postgres@localhost/review_manager'
);

module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};