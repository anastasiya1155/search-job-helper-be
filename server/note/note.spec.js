require('dotenv').config();
const db = require('../utils/testUtils/db');
const { runQuery } = require('../utils/testUtils/run');
const noteResolvers = require('./note.resolvers');

const noteInput = { title: 'test', text: 'supter test', frequency: 90 };

describe('Note', () => {
  beforeAll(db.cleanDB);
  afterEach(db.cleanDB);

  describe('resolvers', () => {
    describe('note queries', () => {
      test('should resolve correctly', async () => {
        const note = await db.models.note.create(noteInput);
        const result = await noteResolvers.Query
          .getAllNotes(null, {}, { models: db.models });

        expect(result[0].id).toBe(note.id);
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
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.getAllNotes[0].id).toBe(`${note.id}`);
      });
    });
    describe('note mutations', () => {
      test('should create note', async () => {
        const input = { input: noteInput };
        const result = await noteResolvers.Mutation.createNote(null, input, { models: db.models });

        expect(result.name).toBe(input.input.name);
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
        const { data, errors } = await runQuery(query, input);

        expect(errors).toBeUndefined();
        expect(data.note.edit.text).toBe(input.input.text);
      });
      test('should remove note', async () => {
        await db.models.note.bulkCreate([
          { ...noteInput },
          { ...noteInput, title: 'test2' },
        ]);
        const notes = await noteResolvers.Query.getAllNotes(null, {}, { models: db.models });
        const result = await noteResolvers.NoteMutations.remove(
          notes[0],
          {},
          { models: db.models },
        );

        expect(result.length).toBe(notes.length - 1);
      });
    });
  });
});
