module.exports = {
  resolvers: require('./interview.resolvers'),
  typeDefs: require('../utils/gqlLoader')('interview/interview.graphql'),
  model: require('./interview.model.ts'),
};
