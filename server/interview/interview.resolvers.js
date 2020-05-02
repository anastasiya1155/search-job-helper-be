const { AuthenticationError } = require('apollo-server');

module.exports = {
  Interview: {
    job: async (parent, args, ctx) => await ctx.models.job.findByPk(parent.jobId),
  },
  InterviewMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.interview.findAll();
    },
  },
  Query: {
    getAllInterviews: async (parent, args, ctx) => await ctx.models.interview.findAll({
      include: [{ model: ctx.models.job, where: { userId: ctx.user.id } }],
    }),
    getInterviewById: async (parent, { id }, ctx) => await ctx.models.interview.findByPk(id, {
      include: [{ model: ctx.models.job, where: { userId: ctx.user.id } }],
    }),
  },
  Mutation: {
    createInterview: async (parent, { input }, ctx) => await ctx.models.interview.create(input),
    interview: async (parent, { id }, ctx) => {
      const interview = await ctx.models.interview.findByPk(id, { include: [ctx.models.job] });
      if (interview.job.userId === ctx.user.id) {
        return interview;
      }
      throw new AuthenticationError('Access denied');
    },
  },
};
