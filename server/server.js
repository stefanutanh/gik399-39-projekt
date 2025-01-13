const express = require("express");
const server = express();
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./projekt.db");

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

    db.run(sql,Object.values(films), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Film tillagd");
    }
  });
  db.close();
});


server.delete("/films/:id", (req, res) => {
  const id = req.params.id; 
  const sql = `DELETE FROM films WHERE id = ${id}`;

    db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Film borttagen");
    }
  });
});

server.put("/films", (req, res) => {
  const films = req.params.id; 
  const db = new sqlite3.Database("./projekt.db");
  const sql = `UPDATE films SET title = ?, year = ?, director = ?, genre = ? WHERE id = ?`;

    db.run(sql,Object.values(films), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Film tillagd");
    }
  });
  db.close();
});



server.listen(3000, () =>
  console.log("Running server on http://localhost:3000")
);
