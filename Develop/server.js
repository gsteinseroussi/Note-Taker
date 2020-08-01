const express = require("express");
const path = require("path");
const note = require("./db/notes");

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

//creating the api routes:
//get route:
app.get("/api/notes", function (req, res) {
  note
    .getNotes()
    .then(function (notes) {
      res.json(notes);
      console.log(res.json(notes));
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

//post route:

app.post("/api/notes", function (req, res) {
  console.log(req.body);
  note
    .addNote(req.body)
    .then(function (notes) {
      res.json(notes);
      console.log(res.json(notes));
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.delete("/api/notes/:id", function (req, res) {
  note
    .deleteNote(req.params.id)
    .then(function () {
      res.json({ ok: true });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});
