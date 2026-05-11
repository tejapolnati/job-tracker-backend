const express = require("express");
const app = express();
const db = require("./config/db");
const bcrypt = require("bcrypt");
console.log("SERVER FILE LOADED");
const jwt = require("jsonwebtoken");
const auth = require("./middleware/auth");


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server working");
});

app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) return res.send("DB Failed");
    res.send("DB Connected");
  });
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
    console.log("Incoming data:", req.body);

  try {
   
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(query, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.log("DB ERROR:", err);
        return res.send("Error inserting user");
      }
      res.send("User registered");
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.send("Server error");
  }
});

app.get("/check-db", (req, res) => {
  db.query("SELECT DATABASE() as db", (err, result) => {
    if (err) return res.send(err);
    res.send(result);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) return res.send("DB error");

    if (result.length === 0) {
      return res.send("User not found");
    }

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.send("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token
    });
  });
});

app.listen(5000, () => {
  console.log("Running on port 5000");
});

app.get("/protected", auth, (req, res) => {
  res.send("Access granted for user " + req.user.id);
});

app.post("/add-job", auth, (req, res) => {
  const { company, role, status } = req.body;
  const user_id = req.user.id;

  const query = `
    INSERT INTO jobs (user_id, company, role, status)
    VALUES (?, ?, ?, ?)
  `;

  db.query(query, [user_id, company, role, status], (err) => {
    if (err) return res.send("Error adding job");
    res.send("Job added");
  });
});

app.get("/jobs", auth, (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT * FROM jobs WHERE user_id = ?";

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.send("Error fetching jobs");
    }

    res.json(result);
  });
});

app.get("/jobs", auth, (req, res) => {
  const user_id = req.user.id;

  const query = "SELECT * FROM jobs WHERE user_id = ?";

  db.query(query, [user_id], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.send("Error fetching jobs");
    }

    res.json(result);
  });
});

app.put("/update-job/:id", auth, (req, res) => {
  const { id } = req.params;
  const { company, role, status } = req.body;
  const user_id = req.user.id;

  const query = `
    UPDATE jobs 
    SET company = ?, role = ?, status = ?
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [company, role, status, id, user_id], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.send("Error updating job");
    }

   res.json({ success: true, message: "Job updated" });
  });
});

app.delete("/delete-job/:id", auth, (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  const query = "DELETE FROM jobs WHERE id = ? AND user_id = ?";

  db.query(query, [id, user_id], (err, result) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.send("Error deleting job");
    }

    res.send("Job deleted");
  });
});