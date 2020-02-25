const Job = require('../job/job.model');

module.exports = {
  Interview: {
    job: async (parent) => await Job.findByPk(parent.jobId),
  },
  InterviewMutations: {
    edit: async (parent, { input }) => await parent.update(input),
    remove: async (parent, args, ctx) => {
      await parent.destroy();
      return await ctx.models.interview.findAll();
    },
  },
  Query: {
    getAllInterviews: async (parent, args, ctx) => await ctx.models.interview.findAll(),
    getInterviewById: async (parent, { id }, ctx) => await ctx.models.interview.findByPk(id),
  },
  Mutation: {
    createInterview: async (parent, { input }, ctx) => await ctx.models.interview.create(input),
    interview: async (parent, { id }, ctx) => await ctx.models.interview.findByPk(id),
  },
};
