require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const noteResolvers = require('./note.resolvers');

let noteInput;
let userId;
let userId2;

describe('Note', () => {
  beforeAll(db.cleanDB);
  beforeEach(async () => {
    const user = await db.models.user.create({ email: 'example@mail.com', password: 'pass' });
    const user2 = await db.models.user.create({ email: 'em@il.com', password: 'pass2' });
    userId = user.id;
    userId2 = user2.id;
    noteInput = {
      title: 'test', text: 'supter test', frequency: 90, userId,
    };
  });
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('note queries', () => {
      test('should resolve correctly', async () => {
        const note = await db.models.note.create(noteInput);
        const result = await noteResolvers.Query
          .getAllNotes(null, {}, { models: db.models, userId });

        expect(result[0].id).toBe(note.id);
      });

      test('should return only my notes', async () => {
        const myNote = await db.models.note.create(noteInput);
        await db.models.note.create({ ...noteInput, userId: userId2 });
        const result = await noteResolvers.Query
          .getAllNotes(null, {}, { models: db.models, userId });

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe(myNote.id);
      });

      test('should have correct query', async () => {
        const note = await db.models.note.create(noteInput);
        const input = { id: note.id };
        const query = `
          query getAllNotes {
            getAllNotes {
              id
              title
              text
              frequency
            }
          }
        `;
        const { data, errors } = await runQuery(query, input, { userId });

        expect(errors).toBeUndefined();
        expect(data.getAllNotes[0].id).toBe(`${note.id}`);
      });
    });
    describe('note mutations', () => {
      test('should create note with my userId', async () => {
        const input = { input: { title: 'test', text: 'supter test', frequency: 90 } };
        const result = await noteResolvers.Mutation.createNote(
          null,
          input,
          { models: db.models, userId },
        );

        expect(result.name).toBe(input.input.name);
        expect(result.userId).toBe(userId);
      });
      test('should edit note', async () => {
        const note = await db.models.note.create(noteInput);
        const input = { id: note.id, input: { text: 'some text' } };
        const query = `
          mutation editNote($id: ID!, $input: NoteInput!){
            note(id: $id) {
              edit(input: $input) {
                id
                title
                text
                frequency
              }
            }
          }
        `;
        const { data, errors } = await runQuery(query, input, { userId });

        expect(errors).toBeUndefined();
        expect(data.note.edit.text).toBe(input.input.text);
      });

      test('should not allow editing not my note', async () => {
        const note = await db.models.note.create({ ...noteInput, userId: userId2 });
        const input = { id: note.id, input: { text: 'some text' } };
        const query = `
          mutation editNote($id: ID!, $input: NoteInput!){
            note(id: $id) {
              edit(input: $input) {
                id
                title
                text
                frequency
              }
            }
          }
        `;
        const { errors } = await runQuery(query, input, { userId });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });

      test('should remove note', async () => {
        await db.models.note.bulkCreate([
          { ...noteInput },
          { ...noteInput, title: 'test2' },
        ]);
        const notes = await noteResolvers.Query.getAllNotes(
          null,
          {},
          { models: db.models, userId },
        );
        const result = await noteResolvers.NoteMutations.remove(
          notes[0],
          {},
          { models: db.models, userId },
        );

        expect(result.length).toBe(notes.length - 1);
      });

      test('should not allow deleting not my note', async () => {
        const note = await db.models.note.create({ ...noteInput, userId: userId2 });
        const query = `
          mutation removeNote($id: ID!){
            note(id: $id) {
              remove {
                id
              }
            }
          }
        `;
        const { errors } = await runQuery(query, { id: note.id }, { userId });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });
    });
  });
});
