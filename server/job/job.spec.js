require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const jobResolvers = require('./job.resolvers');

describe('Project', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('job queries', () => {
      test('should resolve correctly', async () => {
        const job = await db.models.job.create({ name: 'test' });
        const result = await jobResolvers.Query
          .getAllJobs(null, {}, { models: db.models });

        expect(result[0].id).toBe(job.id);
      });

      test('should have correct query', async () => {
        const job = await db.models.job.create({ name: 'test' });
        const input = { id: job.id };
        const query = `
          query getJobById($id: ID!){
            getJobById(id: $id) {
              id
              name
            }
          }
        `;
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.getJobById.id).toBe(`${job.id}`);
      });
    });
    describe('job mutations', () => {
      test('should create job', async () => {
        const input = { input: { name: 'test', position: 'tester', source: 'friend' } };
        const result = await jobResolvers.Mutation.createJob(null, input, { models: db.models });

        expect(result.name).toBe(input.input.name);
      });
      test('should edit job', async () => {
        const job = await db.models.job.create({ name: 'test', position: 'tester', source: 'friend' });
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
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.job.edit.position).toBe(input.input.position);
      });
      test('should remove job', async () => {
        await db.models.job.bulkCreate([
          { name: 'test', position: 'tester', source: 'friend' },
          { name: 'test 2', position: 'FE', source: 'Djiny' },
        ]);
        const jobs = await jobResolvers.Query.getAllJobs(null, {}, { models: db.models });
        const result = await jobResolvers.JobMutations.remove(jobs[0], {}, { models: db.models });

        expect(result.length).toBe(jobs.length - 1);
      });
    });
  });
});
