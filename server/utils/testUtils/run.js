const { makeExecutableSchema } = require('graphql-tools');
const { graphql } = require('graphql');
const {
  typeDefs, resolvers, context, schemaDirectives,
} = require('../../rootSchema');

const runQuery = (query, variables = {}, ctx = {}) => {
  const schema = makeExecutableSchema({ typeDefs, resolvers, schemaDirectives });
  return graphql(schema, query, null, { ...context, ...ctx }, variables);
};

module.exports = {
  runQuery,
};
