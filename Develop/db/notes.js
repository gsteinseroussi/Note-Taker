const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
  readNote() {
    return readFileAsync("db/db.json", "utf8");
  }
  writeNote(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.readNote().then(function (notes) {
      let notesArray = [];
      try {
        notesArray = [].concat(JSON.parse(notes));
      } catch (err) {
        notesArray = [];
      }
      return notesArray;
    });
  }
  deleteNote(id) {
    return this.getNotes().then((notes) => {
      let newNotes = notes.filter((note) => note.id !== id);
      this.writeNote(newNotes);
      notes;
    });
  }

  addNote(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw err;
    }
    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => {
        let allNotes = [...notes, newNote];
        return allNotes;
      })
      .then((newNoteArray) => {
        this.writeNote(newNoteArray);
      })
      .then(() => {
        newNote;
      })
      .then((notes) => resizeBy.json(notes));
  }
}

module.exports = Note;
