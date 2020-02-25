const merge = require('lodash/merge');
const job = require('./job');
const interview = require('./interview');
const { DateFormatterDirective } = require('./utils/directives');
const models = require('./database/models');

const baseSchema = require('./utils/gqlLoader')('./base.graphql');

module.exports = {
  typeDefs: [
    baseSchema,
    job.typeDefs,
    interview.typeDefs,
  ].join(' '),
  resolvers: merge({}, job.resolvers, interview.resolvers),
  context: {
    models,
  },
  schemaDirectives: {
    date: DateFormatterDirective,
  },
};
