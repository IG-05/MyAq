const express = require("express");
const path = require("path");
const pool = require("./conn"); // Import MySQL connection

const app = express();
const port = process.env.PORT || 3300;
const static_path = path.join(__dirname);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(static_path));

// No need for the Register model here

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "register.html"));
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
      res.status(201).sendFile(path.join(__dirname, "login.html"))
    });
  } else {
    res.send("Passwords Do Not Match");
  }
});

app.post("/index", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"))
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"))
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
      res.status(201).sendFile(path.join(__dirname, "main.html"))
    } else {
      res.send("Invalid Login");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
