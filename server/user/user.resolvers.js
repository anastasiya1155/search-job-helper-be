const { ApolloError } = require('apollo-server');
const { loginUserToCtx, validatePassword } = require('./functions');

module.exports = {
  UserMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent) => await parent.destroy(),
  },
  Mutation: {
    createUser: async (parent, { input }, ctx) => await ctx.models.user.create(input),
    user: async (parent, { id }, ctx) => await ctx.models.user.findByPk(id),
    login: async (parent, { email, password }, ctx) => {
      try {
        const user = await ctx.models.user.findOne({
          where: { email: email.trim().toLocaleLowerCase() },
        });
        if (!user) {
          throw new ApolloError('User not registered');
        }
        if (await validatePassword(password, user.password)) {
          const token = await loginUserToCtx(user, ctx);
          return { token, user };
        }
        throw new ApolloError('Invalid password');
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
};
