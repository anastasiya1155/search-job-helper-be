const Sequelize = require('sequelize');
const sequelize = require('../database/connection');
const Job = require('../job/job.model');

const InterviewModel = sequelize.define('interview', {
  startTime: {
    type: Sequelize.DATE,
    field: 'start_time',
  },
  endTime: {
    type: Sequelize.DATE,
    field: 'end_time',
  },
  location: {
    type: Sequelize.STRING,
  },
  jobId: {
    type: Sequelize.INTEGER,
    field: 'job_id',
    references: { model: 'jobs', key: 'id' },
    onDelete: 'set null',
    onUpdate: 'cascade',
  },
  type: {
    type: Sequelize.STRING,
  },
  comments: {
    type: Sequelize.TEXT,
  },
}, {
  underscored: true,
});

InterviewModel.belongsTo(Job);

module.exports = InterviewModel;
