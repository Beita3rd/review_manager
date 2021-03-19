'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const ReviewContent = loader.database.define(
  'review_contents',
  {
    review_contents_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    review_date: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    number_of: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    // is_done: {
    //   type: Sequelize.BOOLEAN,
    //   defaultValue: false
    // },
    study_contents_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = ReviewContent;