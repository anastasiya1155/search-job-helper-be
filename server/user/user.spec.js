require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const userResolvers = require('./user.resolvers');

const userInput = { email: 'example@mail.com', password: 'mySecretPassword' };

describe('User', () => {
  beforeAll(db.cleanDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('user mutations', () => {
      test('should create user and hash its password', async () => {
        const input = { input: userInput };
        const result = await userResolvers.Mutation.createUser(null, input, { models: db.models });

        expect(result.email).toBe(input.input.email);
        expect(result.password).not.toBe(input.input.password);
      });
      test('should allow only unique emails', async () => {
        await db.models.user.create(userInput);
        const query = `
          mutation createUser($input: UserInput!){
            createUser(input: $input) {
              id
              email
            }
          }
        `;

        const { errors } = await runQuery(query, { input: userInput });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('This email is already taken');
      });
      test('should edit user', async () => {
        const user = await db.models.user.create(userInput);
        const input = { id: user.id, input: { password: 'myNewPassword' } };
        const query = `
          mutation editUser($id: ID!, $input: UserInput!){
            user(id: $id) {
              edit(input: $input) {
                id
                email
              }
            }
          }
        `;
        const { errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
      });
    });
  });
});
