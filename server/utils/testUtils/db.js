const Sequelize = require('sequelize');
const Job = require('../../job/job.model');

const models = {
  job: Job,
};

const cleanDB = async (done) => {
  await models.job.truncate();
  done();
};

let sequelize;

const connectToDB = () => {
  sequelize = new Sequelize({
    host: process.env.DB_HOST,
    dialect: 'postgres',
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: 'sjh-test',
  });
};

const disconnectDB = async (done = () => {}) => {
  if (sequelize) {
    sequelize.close().then(done);
  } else {
    done();
  }
};

module.exports = {
  cleanDB,
  connectToDB,
  disconnectDB,
  models,
};
