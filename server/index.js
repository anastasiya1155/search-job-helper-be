require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const sequelize = require('./database/connection');
const { typeDefs, resolvers } = require('./rootSchema');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
});
