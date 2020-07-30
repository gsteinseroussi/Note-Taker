const express = require("express");
const path = require("path");
const fs = require("fs");
const { isBuffer } = require("util");

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

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

//creating the api routes:

app.get("/api/notes", function (req, res) {
  return res.json(notes);
});

app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  fs.readFile("db/db.json", (err, data) => {
    if (err) throw err;
    

    const notes = JSON.parse(data);
    notes.push(newNote);
    fs.writeFile("db/db.json", JSON.stringify(notes), err => {
    if(err) throw err;
      console.log("success");
    })

    // data.append(newNote);
    // fs.writeFile("./db/db.json", data, function (err) {
    //   if (err) throw err;
    // });
  });
});
