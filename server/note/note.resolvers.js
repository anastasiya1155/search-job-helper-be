module.exports = {
  NoteMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.note.findAll();
    },
  },
  Query: {
    getAllNotes: async (parent, args, ctx) => await ctx.models.note.findAll({ order: [['id', 'desc']] }),
  },
  Mutation: {
    createNote: async (parent, { input }, ctx) => await ctx.models.note.create(input),
    note: async (parent, { id }, ctx) => await ctx.models.note.findByPk(id),
  },
};
