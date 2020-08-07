const express = require("express");
const path = require("path");
const Note = require("./db/notes");
const note = new Note();

//sets up the express app

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//initiates the server

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

//creating the api routes:
//get route:
app.get("/api/notes", function (req, res) {
  return note
    .getNotes()
    .then(function (notes) {
      res.json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//post route:

app.post("/api/notes", function (req, res) {
  let db = fs.readFileSync("./db/db.json", "utf-8");
  if (!db) db = "[]"; // if db.json is empty create a string with empty array
  let parsedDB = JSON.parse(db);
  const newNote = {
    id: Math.floor(Math.random() * 10000000),
    title: req.body.title,
    text: req.body.text,
  };
  parsedDB.push(newNote);
  parsedDB = JSON.stringify(parsedDB);
  fs.writeFileSync("./db/db.json", parsedDB);
  res.json(parsedDB);
  //   console.log(req.body);
  //   return note
  //     .addNote(req.body)
  //     .then((notes) => {
  //       let parsedNotes = JSON.stringify(notes);
  //       console.log(parsedNotes);
  //       res.json(parsedNotes);
  //     })
  //     .catch((err) => {
  //       return res.status(500).json(err);
  //     });
});

app.delete("/api/notes/:id", function (req, res) {
  const selectedId = req.params.id;
  return note
    .deleteNote(selectedId)
    .then(function () {
      res.json({ ok: true });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//creates the html paths

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
