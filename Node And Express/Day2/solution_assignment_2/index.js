const express = require("express");
const todosRouter = require("./src/routes/todos.router.js");

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/todos", todosRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});