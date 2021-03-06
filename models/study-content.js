'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const StudyContent = loader.database.define(
  'studyContents',
  {
    studyContentsId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    studyContents: {
      type: Sequelize.STRING,
      allowNull: false
    },
    studyDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAtAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    reviewTimes: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
)

module.exports = StudyContent;