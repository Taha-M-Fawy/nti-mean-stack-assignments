const path = require("path");

const TODOS_PATH = path.resolve(__dirname, "../../data/todos.json");
const ALLOWED_STATUSES = ["to-do", "in progress", "done"];

module.exports = {
  TODOS_PATH,
  ALLOWED_STATUSES,
};