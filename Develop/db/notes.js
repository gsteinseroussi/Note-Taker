const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
  readNote() {
    const temp = readFileAsync("/db.json", "utf8");
    console.log(temp);
    return temp;
    //  return readFileAsync("db/db.json", "utf8");
  }
  writeNote(note) {
    return writeFileAsync("/db.json", JSON.stringify(note));
  }
  getNotes() {
    return this.readNote().then(function (notes) {
      let notesArray = [];
      console.log(notes);
      try {
        notesArray = [].concat(JSON.parse(notes));
        console.log(notes + "dasfa");
      } catch (err) {
        notesArray = [];
      }
      return notesArray;
    });
  }
  deleteNote(id) {
    return this.getNotes().then(function (notes) {
      notes
        .filter((note) => {
          note.id !== id;
        })
        .then(function (notesFiltered) {
          this.writeNote(notesFiltered);
        });
    });
  }

  addNote(note) {
    console.log("hi");
    const { title, text } = note;
    if (!title || !text) {
      throw err;
    }
    const newNote = { title, text, id: uuidv4() };

    return this.getNotes()
      .then((notes) => {
        [...notes, newNote];
      })
      .then(function (newNoteArray) {
        this.writeNote(newNoteArray);
      })
      .then(() => {
        newNote;
      });
  }
}

module.exports = new Note();
