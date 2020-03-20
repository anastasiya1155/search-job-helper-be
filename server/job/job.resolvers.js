module.exports = {
  Job: {
    interviews: async (parent, args, ctx) => await ctx.models.interview.findAll({
      where: { jobId: parent.id },
    }),
  },
  JobMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.job.findAll();
    },
  },
  Query: {
    getAllJobs: async (parent, args, ctx) => await ctx.models.job.findAll({
      order: [['active', 'desc'], ['offer', 'desc'], ['id', 'desc']],
    }),
    getJobById: async (parent, { id }, ctx) => await ctx.models.job.findByPk(id),
  },
  Mutation: {
    createJob: async (parent, { input }, ctx) => await ctx.models.job.create(input),
    job: async (parent, { id }, ctx) => await ctx.models.job.findByPk(id),
  },
};
