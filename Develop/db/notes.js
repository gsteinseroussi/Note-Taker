const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Note {
  readNote() {
    console.log("began reading");
    const allNotes = readFileAsync("./db/db.json", "utf8", function (
      err,
      data
    ) {
      if (err) {
        throw err;
      }
      return JSON.stringify(data);
    }).then(function (data) {
      return data;
    });
    //  return readFileAsync("db/db.json", "utf8");
    console.log(allNotes);
    return allNotes;
  }
  writeNote(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note));
  }
  getNotes() {
    console.log("running get notes");
    return this.readNote().then(function (notes) {
      console.log(notes + "console log notes");
      let notesArray = [];

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
