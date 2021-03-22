'use strict';
const Sequelize = require('sequelize');
// const sequelize = new Sequelize(
//   process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/review_manager'
//  );
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
      ssl: true
  }
});
module.exports = {
  database: sequelize,
  Sequelize: Sequelize
};