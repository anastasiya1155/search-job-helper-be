require('dotenv').config();
const moment = require('moment');
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const interviewResolvers = require('./interview.resolvers');

const testJob = { name: 'testJob' };
let jobId;

describe('Interview', () => {
  beforeAll(db.cleanDB);
  beforeEach(() => db.models.job.create(testJob).then((j) => {
    jobId = j.id;
  }));
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('interview queries', () => {
      test('should resolve correctly', async () => {
        const interview = await db.models.interview.create({ startTime: '2020-02-25 12:00', type: 'tech', jobId });
        const result = await interviewResolvers.Query
          .getAllInterviews(null, {}, { models: db.models });
        expect(result[0].id).toBe(interview.id);
      });

      test('should have correct query', async () => {
        const interview = await db.models.interview.create({ startTime: '2020-02-25 12:00', type: 'tech', jobId });
        const input = { id: interview.id };
        const query = `
          query getInterviewById($id: ID!){
            getInterviewById(id: $id) {
              id
              startTime(format: "DD/MM/YYYY h:m")
              endTime(format: "DD/MM/YYYY h:m")
              location
              type
              job {
                id
                name
              }
            }
          }
        `;
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.getInterviewById.id).toBe(`${interview.id}`);
        expect(data.getInterviewById.job.name).toBe(testJob.name);
      });
    });
    describe('interview mutations', () => {
      test('should create interview', async () => {
        const input = { input: { startTime: '2020-02-25T10:00:00.000Z', type: 'tech', jobId } };
        const result = await interviewResolvers.Mutation.createInterview(null, input, { models: db.models });

        expect(moment(result.startTime).isSame(input.input.startTime, 'minute')).toBe(true);
      });
      test('should edit interview', async () => {
        const interview = await db.models.interview.create({ startTime: '2020-02-25 12:00', type: 'tech', jobId });
        const input = { id: interview.id, input: { comments: 'Algorithms and complexity' } };
        const query = `
          mutation editInterview($id: ID!, $input: InterviewInput!){
            interview(id: $id) {
              edit(input: $input) {
                id
                comments
              }
            }
          }
        `;
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.interview.edit.comments).toBe(input.input.comments);
      });
      test('should remove interview', async () => {
        await db.models.interview.bulkCreate([
          { startTime: '2020-02-25 12:00', type: 'tech', jobId },
          { startTime: '2020-02-26 13:00', type: 'owner', jobId },
        ]);
        const interviews = await interviewResolvers.Query.getAllInterviews(null, {}, { models: db.models });
        const result = await interviewResolvers.InterviewMutations.remove(interviews[0], {}, { models: db.models });

        expect(result.length).toBe(interviews.length - 1);
      });
    });
  });
});
