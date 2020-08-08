module.exports = {
  resolvers: require('./user.resolvers'),
  typeDefs: require('../utils/gqlLoader')('user/user.graphql'),
  model: require('./user.model.ts'),
};
