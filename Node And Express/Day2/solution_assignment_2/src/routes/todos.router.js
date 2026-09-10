const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController.js");

router.route("/")
  .post(createTodo)
  .get(getAllTodos);

router.route("/:id")
  .get(getTodoById)
  .patch(updateTodo)
  .delete(deleteTodo);

module.exports = router;