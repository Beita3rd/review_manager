'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const ReviewContent = loader.database.define(
  'review_contents',
  {
    reviewContentsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    reviewDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    reviewTimes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    studyContentsId: {
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