const express = require("express");
const path = require("path");
const pool = require("./db/conn"); // Import MySQL connection

const app = express();
const port = process.env.PORT || 3300;
const static_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));
app.set("view engine", "hbs");

// No need for the Register model here

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { username, password, confirm_password } = req.body;

  if (password === confirm_password) {
    const insertQuery = 'INSERT INTO login (username, password, confirmPassword) VALUES (?, ?, ?)';
    pool.query(insertQuery, [username, password, confirm_password], (error, results, fields) => {
      if (error) {
        res.status(400).send(error);
        return;
      }
      res.status(201).render("login");
    });
  } else {
    res.send("Passwords Do Not Match");
  }
});

app.post("/index", (req, res) => {
  res.render("login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const selectQuery = 'SELECT * FROM login WHERE username = ? AND password = ?';
  pool.query(selectQuery, [username, password], (error, results, fields) => {
    if (error) {
      res.status(400).send("Invalid Login");
      return;
    }

    if (results.length > 0) {
      res.status(201).render("main");
    } else {
      res.send("Invalid Login");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
