module.exports = {
  resolvers: require('./job.resolvers'),
  typeDefs: require('../utils/gqlLoader')('job/job.graphql'),
  model: require('./job.model.ts'),
};
