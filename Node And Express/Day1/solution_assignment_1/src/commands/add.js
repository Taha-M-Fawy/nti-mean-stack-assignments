const { readTodos, writeTodos } = require("../utils/fileGen.js");

const add = (title) => {
  if (!title) {
    console.log("Please provide a title for the todo!");
    return;
  }

  const todos = readTodos();
  const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const newTodo = {
    id: nextId,
    title: title,
    status: "to-do",
  };

  todos.push(newTodo);
  writeTodos(todos);
  console.log(`Todo added successfully: [${newTodo.id}] ${newTodo.title} (Status: ${newTodo.status})`);
};

module.exports = { add };