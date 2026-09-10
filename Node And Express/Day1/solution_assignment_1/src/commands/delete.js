const { readTodos, writeTodos } = require("../utils/fileGen.js");

const deleteTodo = (id) => {
  if (!id) {
    console.log("Usage: node index.js delete <id>");
    return;
  }

  const todos = readTodos();
  const filteredTodos = todos.filter((t) => t.id !== Number(id));

  if (todos.length === filteredTodos.length) {
    console.log(`Todo with ID ${id} not found.`);
    return;
  }

  writeTodos(filteredTodos);
  console.log(`Todo with ID ${id} deleted successfully.`);
};

module.exports = { deleteTodo };