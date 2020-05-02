require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const noteResolvers = require('./note.resolvers');

let noteInput;
let user;
let user2;

describe('Note', () => {
  beforeAll(db.cleanDB);
  beforeEach(async () => {
    user = await db.models.user.create({ email: 'example@mail.com', password: 'pass' });
    user2 = await db.models.user.create({ email: 'em@il.com', password: 'pass2' });
    noteInput = {
      title: 'test', text: 'supter test', frequency: 90, userId: user.id,
    };
  });
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('note queries', () => {
      test('should resolve correctly', async () => {
        const note = await db.models.note.create(noteInput);
        const result = await noteResolvers.Query
          .getAllNotes(null, {}, { models: db.models, user });

        expect(result[0].id).toBe(note.id);
      });

      test('should return only my notes', async () => {
        const myNote = await db.models.note.create(noteInput);
        await db.models.note.create({ ...noteInput, userId: user2.id });
        const result = await noteResolvers.Query
          .getAllNotes(null, {}, { models: db.models, user });

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
        const { data, errors } = await runQuery(query, input, { user });

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
          { models: db.models, user },
        );

        expect(result.name).toBe(input.input.name);
        expect(result.userId).toBe(user.id);
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
        const { data, errors } = await runQuery(query, input, { user });

        expect(errors).toBeUndefined();
        expect(data.note.edit.text).toBe(input.input.text);
      });

      test('should not allow editing not my note', async () => {
        const note = await db.models.note.create({ ...noteInput, userId: user2.id });
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
        const { errors } = await runQuery(query, input, { user });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });

      test('should remove note', async () => {
        await db.models.note.bulkCreate([
          { ...noteInput },
          { ...noteInput, title: 'test2' },
        ]);
        const notes = await noteResolvers.Query.getAllNotes(null, {}, { models: db.models, user });
        const result = await noteResolvers.NoteMutations.remove(
          notes[0],
          {},
          { models: db.models, user },
        );

        expect(result.length).toBe(notes.length - 1);
      });

      test('should not allow deleting not my note', async () => {
        const note = await db.models.note.create({ ...noteInput, userId: user2.id });
        const query = `
          mutation removeNote($id: ID!){
            note(id: $id) {
              remove {
                id
              }
            }
          }
        `;
        const { errors } = await runQuery(query, { id: note.id }, { user });

        expect(errors).toHaveLength(1);
        expect(errors[0].message).toBe('Access denied');
      });
    });
  });
});
