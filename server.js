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
  console.log(req.body);
  return note
    .addNote(req.body)
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
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
