const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/taskController");
const authenticateUser = require("../middleware/authMiddleware");

router.post("/", authenticateUser, TaskController.createTask);
router.get("/", authenticateUser, TaskController.getTasks);
router.get("/:id", authenticateUser, TaskController.getTaskById);
router.put("/:id", authenticateUser, TaskController.updateTask);
router.delete("/:id", authenticateUser, TaskController.deleteTask);

module.exports = router;
