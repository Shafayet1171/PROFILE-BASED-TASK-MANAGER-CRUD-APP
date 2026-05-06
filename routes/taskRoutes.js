const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const verifyToken = require("../middleware/authMiddleware");

//protected routes

router.post("/create", verifyToken, taskController.createTask);
router.get("/my", verifyToken, taskController.getMyTasks);
router.get("/all", verifyToken, taskController.getAllTasks);
router.put("/update/:id", verifyToken, taskController.updateTask);
router.delete("/delete/:id", verifyToken, taskController.deleteTask);

module.exports = router;