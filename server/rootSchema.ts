const merge = require('lodash/merge');
const job = require('./job');
const interview = require('./interview');
const note = require('./note');
const user = require('./user');
const { DateFormatterDirective } = require('./utils/directives');
const models = require('./database/models');

const baseSchema = require('./utils/gqlLoader')('./base.graphql');

module.exports = {
  typeDefs: [
    baseSchema,
    job.typeDefs,
    interview.typeDefs,
    note.typeDefs,
    user.typeDefs,
  ].join(' '),
  resolvers: merge({}, job.resolvers, interview.resolvers, note.resolvers, user.resolvers),
  context: {
    models,
  },
  schemaDirectives: {
    date: DateFormatterDirective,
  },
};
