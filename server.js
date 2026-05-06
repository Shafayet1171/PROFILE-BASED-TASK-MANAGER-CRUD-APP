const express = require("express");
const app = express();

require("dotenv").config();
require("./config/db");

app.use(express.json());

// routes

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

// profile route

const verifyToken = require("./middleware/authMiddleware");

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});