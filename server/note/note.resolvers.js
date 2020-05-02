const { AuthenticationError } = require('apollo-server');

module.exports = {
  NoteMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.note.findAll();
    },
  },
  Query: {
    getAllNotes: async (parent, args, ctx) => await ctx.models.note.findAll({
      where: { userId: ctx.user.id },
      order: [['id', 'desc']],
    }),
  },
  Mutation: {
    createNote: async (parent, { input }, ctx) => await ctx.models.note.create({
      ...input, userId: ctx.user.id,
    }),
    note: async (parent, { id }, ctx) => {
      const note = await ctx.models.note.findByPk(id);
      if (note.userId === ctx.user.id) {
        return note;
      }
      throw new AuthenticationError('Access denied');
    },
  },
};
