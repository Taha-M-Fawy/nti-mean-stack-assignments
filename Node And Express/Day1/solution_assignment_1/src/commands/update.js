const { readTodos, writeTodos } = require("../utils/fileGen.js");

const ALLOWED_STATUSES = ["to-do", "in progress", "done"];

const update = ({ id, title, status }) => {
  if (!id) {
    console.log("Please provide an ID using --id <id>");
    return;
  }

  if (!title && !status) {
    console.log("You must specify at least -t (title) or -s (status) to update.");
    return;
  }

  if (status && !ALLOWED_STATUSES.includes(status)) {
    console.log(`Invalid status! Allowed values are: ${ALLOWED_STATUSES.join(", ")}`);
    return;
  }

  const todos = readTodos();
  const todo = todos.find((t) => t.id === Number(id));

  if (!todo) {
    console.log(`Todo with ID ${id} not found.`);
    return;
  }

  if (title) todo.title = title;
  if (status) todo.status = status;

  writeTodos(todos);
  console.log(`Todo ${id} updated successfully: "${todo.title}" | Status: [${todo.status}]`);
};

module.exports = { update };