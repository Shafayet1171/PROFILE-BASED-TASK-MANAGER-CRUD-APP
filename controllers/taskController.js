const db = require("../config/db");

//create tasks

exports.createTask = (req, res) => {
  const { title, description } = req.body;
  const user_id = req.user.id;

  db.query(
    "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
    [title, description, "pending", user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task created successfully" });
    }
  );
};

// GET MY TASKS (USER)

exports.getMyTasks = (req, res) => {
  const user_id = req.user.id;

  db.query(
    "SELECT * FROM tasks WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

// ADMIN: 

exports.getAllTasks = (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// UPDATE task 

exports.updateTask = (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const user_id = req.user.id;

  db.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=? AND user_id=?",
    [title, description, status, id, user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task updated successfully" });
    }
  );
};

// DELETE TASK

exports.deleteTask = (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  db.query(
    "DELETE FROM tasks WHERE id = ? AND user_id = ?",
    [id, user_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Task deleted successfully" });
    }
  );
};