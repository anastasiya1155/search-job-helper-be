const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const InterviewModel = sequelize.define('interview', {
  date: {
    type: Sequelize.DATE,
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

module.exports = InterviewModel;
