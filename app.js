require("dotenv").config(); // 🔐 load env variables

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

const upload = multer();

// ✅ MySQL connection using .env (NO PASSWORD IN CODE)
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle form submission
app.post("/submit", upload.none(), (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving message");
    }
    res.send("Message saved successfully ✅");
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});