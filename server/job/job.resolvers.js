module.exports = {
  JobMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.job.findAll();
    },
  },
  Query: {
    getAllJobs: async (parent, args, ctx) => await ctx.models.job.findAll(),
    getJobById: async (parent, { id }, ctx) => await ctx.models.job.findByPk(id),
  },
  Mutation: {
    createJob: async (parent, { input }, ctx) => await ctx.models.job.create(input),
    job: async (parent, { id }, ctx) => await ctx.models.job.findByPk(id),
  },
};
