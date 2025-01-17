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
  const sql = "SELECT * FROM films";

  db.all(sql, (err, rows) => {
    if (err) {
      return res
        .status(500)
        .send({ error: "Database error", details: err.message });
    }
    res.send(rows);
  });
 
});

server.post("/films", (req, res) => {
  const films = req.body; 
  const sql = `INSERT INTO films (title, year, director, genre) VALUES (?, ?, ?, ?)`;

    db.run(sql,Object.values(films), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Film tillagd");
      console.log("Film tillagd")
    }
  });
 
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
      console.log("Film borttagen")
    }
  });
});

server.put("/films/:id", (req, res) => {
  const id = req.params.id;
  const film = req.body;
  const sql = `UPDATE films SET title = ?, year = ?, director = ?, genre = ? WHERE id = ?`;
  const params = [...Object.values(film), id];
  
  db.run(sql, params, (err) => {
      if (err) {
          console.log(err);
          res.status(500).send(err);
      } else {
          res.send("Film uppdaterad");
          console.log("Film uppdaterad")
      }
  });
});

server.listen(3000, () =>
  console.log("Running server on http://localhost:3000")
);
