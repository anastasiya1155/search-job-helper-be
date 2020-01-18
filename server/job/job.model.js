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
}, {
  underscored: true,
});

module.exports = JobModel;
