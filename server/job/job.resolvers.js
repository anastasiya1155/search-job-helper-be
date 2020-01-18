module.exports = {
  Query: {
    getAllJobs: async (parent, args, ctx) => await ctx.models.job.findAll(),
    getJobById: async (parent, { id }, ctx) => await ctx.models.job.findByPk(id),
  },
};
