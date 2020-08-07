const express = require("express");
const path = require("path");
const fs = require("fs");

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

//creating the api routes:
//get route:
app.get("/api/notes", function (req, res) {
  let db = fs.readFileSync("./db/db.json");
  let parsedDb = JSON.parse(db);
  res.json(parsedDb);
});

//post route:

app.post("/api/notes", function (req, res) {
  // let idNum = 1;
  const newNote = req.body;

  // idNum++;
  // newNote.id = idNum;
  fs.readFile("db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    let notes = JSON.parse(data);
    newNote.id = Math.floor(Math.random() * 10000);
    notes.push(newNote);
    let stringNote = JSON.stringify(notes);

    fs.writeFileSync("db/db.json", stringNote);

    res.json(notes);

    // data.append(newNote);
    // fs.writeFile("./db/db.json", data, function (err) {
    //   if (err) throw err;
    // });
  });
});

app.delete("/api/notes/:id", function (req, res) {
  const id = parseInt(req.params.id);

  let notes = fs.readFileSync("db/db.json");
  let parsedNotes = JSON.parse(notes);

  let newNotesArray = parsedNotes.filter((note) => note.id !== id);
  console.log(newNotesArray);
  let stringNote = JSON.stringify(newNotesArray);

  fs.writeFileSync("db/db.json", stringNote);

  res.json(newNotesArray);
});
