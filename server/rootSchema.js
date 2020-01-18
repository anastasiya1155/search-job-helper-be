const merge = require('lodash/merge');
const job = require('./job');


module.exports = {
  typeDefs: [
    job.typeDefs,
  ].join(' '),
  resolvers: merge({}, job.resolvers),
  context: {
    models: {
      job: job.model,
    },
  },
};
