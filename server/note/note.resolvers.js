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
      where: { userId: ctx.userId },
      order: [['id', 'desc']],
    }),
  },
  Mutation: {
    createNote: async (parent, { input }, ctx) => await ctx.models.note.create({
      ...input, userId: ctx.userId,
    }),
    note: async (parent, { id }, ctx) => {
      const note = await ctx.models.note.findByPk(id);
      if (note.userId === ctx.userId) {
        return note;
      }
      throw new AuthenticationError('Access denied');
    },
  },
};
