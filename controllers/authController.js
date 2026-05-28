const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query =
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(query, [name, email, hashedPassword], (err) => {
      if (err) {
        console.log(err);
      return res.status(500).json({
  success: false,
  message: "Database error"
});
      }
res.status(201).json({
  success: true,
  message: "User registered"
})
    });
  } catch (error) {
    res.status(500).json({
  success: false,
  message: "Server error"
});
  }
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";

  db.query(query, [email], async (err, result) => {
    if (err) {
  return res.status(500).json({
    success: false,
    message: "Database error"
  });
}

   if (result.length === 0) {
  return res.status(404).json({
    success: false,
    message: "User not found"
  });
}

    const user = result[0];

    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid password"
  });
}

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

  res.status(200).json({
  success: true,
  message: "Login successful",
  token,
});
  });
};