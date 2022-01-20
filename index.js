const yargs = require('yargs');
const { addNote, editNote, removeNote, printNotes } = require('./notes.controller');

yargs.command({
  command: 'add',
  describe: 'Add note new note to list',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove note by id',
  builder: {
    id: {
      type: 'string',
      describe: 'Id note',
      demandOption: true,
    },
  },
  handler({ id }) {
    removeNote(id);
  },
});

yargs.command({
  command: 'list',
  describe: 'Print all notes',
  handler() {
    printNotes()
  },
});

yargs.command({
  command: 'edit',
  describe: 'Edit note by id',
  builder: {
    title: {
      type: 'string',
      describe: 'Note title',
      demandOption: true,
    },
    id: {
      type: 'string',
      describe: 'Id node',
      demandOption: true
    }
  },
  handler({ id, title }) {
    editNote(id, title);
  },
});

yargs.parse();
