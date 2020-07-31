const moment = require('moment');
const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver, GraphQLString } = require('graphql');

class DateFormatterDirective extends SchemaDirectiveVisitor {
  // eslint-disable-next-line no-unused-vars
  visitFieldDefinition(field, details) {
    const resolver = field.resolve || defaultFieldResolver;
    const { format } = this.args;
    field.args.push({
      type: GraphQLString,
      name: 'format',
    });
    // eslint-disable-next-line no-param-reassign
    field.resolve = async (root, { format: argsFormat, ...restArgs }, ctx, info) => {
      const result = await resolver.call(this, root, restArgs, ctx, info);
      if (!result) {
        return result;
      }
      return moment(result).format(argsFormat || format);
    };
  }
}

module.exports = {
  DateFormatterDirective,
};
