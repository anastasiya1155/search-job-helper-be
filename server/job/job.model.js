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
  interested: {
    type: Sequelize.INTEGER,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  salaryAsk: {
    type: Sequelize.INTEGER,
    field: 'salary_ask',
  },
  salaryOffer: {
    type: Sequelize.INTEGER,
    field: 'salary_offer',
  },
  timeToOffice: {
    type: Sequelize.INTEGER,
    field: 'time_to_office',
  },
  offer: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  testTask: {
    type: Sequelize.STRING,
    field: 'test_task',
  },
}, {
  underscored: true,
});

module.exports = JobModel;
