module.exports = {
  resolvers: require('./note.resolvers'),
  typeDefs: require('../utils/gqlLoader')('note/note.graphql'),
  model: require('./note.model'),
};
