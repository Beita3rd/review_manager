'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const StudyContent = loader.database.define(
  'study_contents',
  {
    study_contents_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    study_contents: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    user_id: {
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