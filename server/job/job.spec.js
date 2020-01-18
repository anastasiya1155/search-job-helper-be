require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const jobResolvers = require('./job.resolvers');

describe('Project', () => {
  beforeAll(db.connectToDB);
  afterAll(db.disconnectDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('job', () => {
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
  });
});
