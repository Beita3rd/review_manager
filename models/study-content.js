'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const StudyContent = loader.database.define(
  'study_contents',
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
    updatedAt: {
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
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = StudyContent;