console.log("message")

const express = require("express");
const server = express();
const sqlite3 = require("sqlite3");
const port = 3000;

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");

    next();
  });

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });