const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const { typeDefs, resolvers, context } = require('../../rootSchema');

const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  return graphql(schema, query, null, { ...context, ...ctx }, variables);
};

module.exports = {
  runQuery,
};
