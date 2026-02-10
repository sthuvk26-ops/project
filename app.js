const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

// Multer setup (for form data)
const upload = multer();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle form submission
app.post("/submit", upload.none(), (req, res) => {
  console.log("FORM DATA:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required");
  }

  const text = `
------------------------
Name: ${name}
Email: ${email}
Message: ${message}
Date: ${new Date().toLocaleString()}
------------------------
`;

  fs.appendFile("messages.txt", text, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error saving message");
    }
    res.send("Message saved successfully");
  });
});

// Start server
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});