const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER portion

exports.register = (req, res) => {
  const { username, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hash) => {
    db.query(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hash, "user"],
      (err) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "User registered successfully" });
      }
    );
  });
};

// LOGIN portion

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0)
      return res.status(404).json({ message: "User not found" });

    const user = result[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).json({ message: "Invalid password" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        message: "Login successful",
        token
      });
    });
  });
};