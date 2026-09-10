const { readTodos } = require("../utils/fileGen.js");

const ALLOWED_STATUSES = ["to-do", "in progress", "done"];

const list = (status) => {
  let todos = readTodos();

  if (status) {
    if (!ALLOWED_STATUSES.includes(status)) {
      console.log(`Invalid status! Allowed values are: ${ALLOWED_STATUSES.join(", ")}`);
      return;
    }
    todos = todos.filter((todo) => todo.status === status);
  }

  if (todos.length === 0) {
    console.log(status ? `No todos found with status: "${status}"` : "No todos found.");
    return;
  }

  console.log(status ? `--- Todo List (${status}) ---` : "--- Your Todo List ---");
  todos.forEach((todo) => {
    console.log(`ID: ${todo.id} | Title: ${todo.title} | Status: [${todo.status || "to-do"}]`);
  });
};

module.exports = { list };