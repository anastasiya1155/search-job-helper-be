require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, context } = require('./rootSchema');

const server = new ApolloServer({ typeDefs, resolvers, context });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
