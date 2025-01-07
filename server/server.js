const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

server.get("/films", (req, res) => {
  const db = new sqlite3.Database("./projekt.db");
  const sql = "SELECT * FROM films";

  db.all(sql, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Database error", details: err.message });
    }
    res.send(rows);
  });
  db.close();
});

server.post("/films", (req, res) => {
  const films = req.body; 
  const db = new sqlite3.Database("./projekt.db");
  const sql = `INSERT INTO films (title, year, director, genre) VALUES (?, ?, ?, ?)`;

    db.run(sql, Object.values(films), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Film added successfully!");
    }
  });
  db.close();
});

server.listen(3000, () =>
  console.log("Running server on http://localhost:3000")
);
