const models = require('../../database/models');

const cleanDB = async (done) => {
  await models.interview.destroy({ where: {} });
  await models.job.destroy({ where: {} });
  await models.note.destroy({ where: {} });
  await models.user.destroy({ where: {} });
  done();
};

module.exports = {
  cleanDB,
  models,
};
