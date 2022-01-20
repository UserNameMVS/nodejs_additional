const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json');
console.log(notesPath);

async function addNote(title) {
  const notes = await getNotes();

  const note = {
    title,
    id: Date.now().toString(),
  };

  notes.push(note);

  await saveNotes(notes);
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, { encoding: 'utf-8' });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function removeNote(id) {
  const notes = await getNotes()
  await saveNotes(notes.filter((n) => n.id !== id));
}

async function editNote(id, title) {
  const notes = await getNotes();
  const nodeIndex = notes.findIndex((note) => note.id === id);
  notes[nodeIndex] = { ...notes[nodeIndex], title };
  await saveNotes(notes);
}

async function printNotes() {
  const notes = await getNotes()
  console.log(chalk.green('List of notes:'));

  notes.forEach(n => {
    console.log(`${chalk.bgBlue(n.id)}: ${chalk.blue(n.title)}`);
  })
}

module.exports = {
  addNote,
  printNotes,
  removeNote,
  editNote
};
