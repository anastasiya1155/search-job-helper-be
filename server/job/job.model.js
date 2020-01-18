const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const JobModel = sequelize.define('job', {
  name: {
    type: Sequelize.STRING,
  },
  position: {
    type: Sequelize.STRING,
  },
  source: {
    type: Sequelize.STRING,
  },
  link: {
    type: Sequelize.STRING,
  },
  team: {
    type: Sequelize.TEXT,
  },
  remoteOption: {
    type: Sequelize.BOOLEAN,
    field: 'remote_option',
  },
  fullyRemote: {
    type: Sequelize.BOOLEAN,
    field: 'fully_remote',
  },
  laptopProvided: {
    type: Sequelize.BOOLEAN,
    field: 'laptop_provided',
  },
  stack: {
    type: Sequelize.TEXT,
  },
  officeAddress: {
    type: Sequelize.STRING,
    field: 'office_address',
  },
  additionalBonuses: {
    type: Sequelize.TEXT,
    field: 'additional_bonuses',
  },
  projectAge: {
    type: Sequelize.INTEGER,
    field: 'project_age',
  },
  comments: {
    type: Sequelize.TEXT,
  },
}, {
  underscored: true,
});

module.exports = JobModel;
