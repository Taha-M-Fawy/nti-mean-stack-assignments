const fs = require("fs");
const { TODOS_PATH } = require("../constants/index.js");

const readTodos = () => {
  try {
    if (!fs.existsSync(TODOS_PATH)) {
      fs.writeFileSync(TODOS_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(TODOS_PATH, "utf8");
    return data.trim() ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading file:", error.message);
    return [];
  }
};

const writeTodos = (todos) => {
  try {
    fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Error writing to file:", error.message);
  }
};

module.exports = {
  readTodos,
  writeTodos,
};