require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const {
  typeDefs, resolvers, context, schemaDirectives,
} = require('./rootSchema');

const server = new ApolloServer({
  typeDefs, resolvers, context, schemaDirectives,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
