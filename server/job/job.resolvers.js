const { AuthenticationError } = require('apollo-server');

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
      return await ctx.models.job.findAll({
        where: { userId: ctx.user.id },
        order: [['active', 'desc'], ['offer', 'desc'], ['id', 'desc']],
      });
    },
  },
  Query: {
    getAllJobs: async (parent, args, ctx) => await ctx.models.job.findAll({
      where: { userId: ctx.user.id },
      order: [['active', 'desc'], ['offer', 'desc'], ['id', 'desc']],
    }),
    getJobById: async (parent, { id }, ctx) => {
      const job = await ctx.models.job.findByPk(id);
      if (job.userId === ctx.user.id) {
        return job;
      }
      throw new AuthenticationError('Access denied');
    },
  },
  Mutation: {
    createJob: async (parent, { input }, ctx) => await ctx.models.job.create({
      ...input, userId: ctx.user.id,
    }),
    job: async (parent, { id }, ctx) => {
      const job = await ctx.models.job.findByPk(id);
      if (job.userId === ctx.user.id) {
        return job;
      }
      throw new AuthenticationError('Access denied');
    },
  },
};
