require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const {
  typeDefs, resolvers, context, schemaDirectives,
} = require('./rootSchema');
const { getUser } = require('./user/functions');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    const jwtResp = getUser(token);

    return { ...context, userId: jwtResp ? jwtResp.user : null };
  },
  schemaDirectives,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
