require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const jobResolvers = require('./job.resolvers');

let user;
let user2;

describe('Job', () => {
  beforeAll(db.cleanDB);
  beforeEach(async () => {
    user = await db.models.user.create({ email: 'example@mail.com', password: 'pass' });
    user2 = await db.models.user.create({ email: 'em@il.com', password: 'pass2' });
  });
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('job queries', () => {
      test('should resolve correctly', async () => {
        const job = await db.models.job.create({ name: 'test', userId: user.id });
        const result = await jobResolvers.Query
          .getAllJobs(null, {}, { models: db.models, user });

        expect(result[0].id).toBe(job.id);
      });

      test('should return only jobs of current user', async () => {
        const myJob = await db.models.job.create({ name: 'test', userId: user.id });
        await db.models.job.create({ name: 'test', userId: user2.id });
        const result = await jobResolvers.Query
          .getAllJobs(null, {}, { models: db.models, user });

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(myJob.id);
      });

      test('should have correct query', async () => {
        const job = await db.models.job.create({ name: 'test', userId: user.id });
        const interviews = [
          { startTime: '2020-02-25 12:00', type: 'tech', jobId: job.id },
          { startTime: '2020-02-26 13:00', type: 'owner', jobId: job.id },
        ];
        await db.models.interview.bulkCreate(interviews);
        const input = { id: job.id };
        const query = `
          query getJobById($id: ID!){
            getJobById(id: $id) {
              id
              name
              interviews {
                id
              }
            }
          }
        `;
        const { data, errors } = await runQuery(query, input, { user });

        expect(errors).toBeUndefined();
        expect(data.getJobById.id).toBe(`${job.id}`);
        expect(data.getJobById.interviews.length).toBe(interviews.length);
      });
    });
    describe('job mutations', () => {
      test('should create job with my userId', async () => {
        const input = {
          input: {
            name: 'test', position: 'tester', source: 'friend',
          },
        };
        const result = await jobResolvers.Mutation.createJob(
          null,
          input,
          { models: db.models, user },
        );

        expect(result.name).toBe(input.input.name);
        expect(result.userId).toBe(user.id);
      });
      test('should edit job', async () => {
        const job = await db.models.job.create({
          name: 'test', position: 'tester', source: 'friend', userId: user.id,
        });
        const input = { id: job.id, input: { position: 'FullStack' } };
        const query = `
          mutation editJob($id: ID!, $input: JobInput!){
            job(id: $id) {
              edit(input: $input) {
                id
                name
                position
              }
            }
          }
        `;
        const { data, errors } = await runQuery(query, input, { user });

        expect(errors).toBeUndefined();
        expect(data.job.edit.position).toBe(input.input.position);
      });

      test('should not allow editing not my job', async () => {
        const job = await db.models.job.create({
          name: 'test', position: 'tester', source: 'friend', userId: user2.id,
        });
        const input = { id: job.id, input: { position: 'FullStack' } };
        const query = `
          mutation editJob($id: ID!, $input: JobInput!){
            job(id: $id) {
              edit(input: $input) {
                id
                name
                position
              }
            }
          }
        `;
        const { errors } = await runQuery(query, input, { user });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });

      test('should remove job', async () => {
        await db.models.job.bulkCreate([
          {
            name: 'test', position: 'tester', source: 'friend', userId: user.id,
          },
          {
            name: 'test 2', position: 'FE', source: 'Djiny', userId: user.id,
          },
        ]);
        const jobs = await jobResolvers.Query.getAllJobs(null, {}, { models: db.models, user });
        const result = await jobResolvers.JobMutations.remove(
          jobs[0],
          {},
          { models: db.models, user },
        );

        expect(result.length).toBe(jobs.length - 1);
      });

      test('should not allow deleting not my job', async () => {
        const job = await db.models.job.create({
          name: 'test', position: 'tester', source: 'friend', userId: user2.id,
        });
        const query = `
          mutation removeJob($id: ID!){
            job(id: $id) {
              remove {
                id
              }
            }
          }
        `;
        const { errors } = await runQuery(query, { id: job.id }, { user });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });
    });
  });
});
