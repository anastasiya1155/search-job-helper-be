const Sequelize = require('sequelize');
const Job = require('../../job/job.model');

const models = {
  job: Job,
};

const cleanDB = async (done) => {
  await models.job.truncate();
  done();
};

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'postgres',
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'sjh-test',
});

const connectToDB = () => sequelize;

const disconnectDB = async (done = () => {}) => {
  sequelize.close().then(done);
};

module.exports = {
  cleanDB,
  connectToDB,
  disconnectDB,
  models,
};
