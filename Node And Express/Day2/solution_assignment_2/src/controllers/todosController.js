const { readTodos, writeTodos } = require("../utils/fileGen.js");
const { ALLOWED_STATUSES } = require("../constants/index.js");

// POST /todos
const createTodo = (req, res) => {
    const { title } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
        return res.status(400).json({ error: "Title is required and must be a non-empty string" });
    }

    const todos = readTodos();
    const nextId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

    const newTodo = {
        id: nextId,
        title: title.trim(),
        status: "to-do",
    };

    todos.push(newTodo);
    writeTodos(todos);

    return res.status(201).json(newTodo);
};

// GET /todos?limit=10&skip=0&status=done
const getAllTodos = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;
    const status = req.query.status;

    let todos = readTodos();

    if (status) {
        if (!ALLOWED_STATUSES.includes(status)) {
            return res.status(400).json({
                error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`,
            });
        }
        todos = todos.filter((todo) => todo.status === status);
    }

    const paginatedTodos = todos.slice(skip, skip + limit);

    return res.status(200).json({
        total: todos.length,
        skip,
        limit,
        data: paginatedTodos,
    });
};

// GET /todos/:id
const getTodoById = (req, res) => {
    const id = Number(req.params.id);
    const todos = readTodos();

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
        return res.status(404).json({ error: `Todo with ID ${id} not found` });
    }

    return res.status(200).json(todo);
};

// PATCH /todos/:id
const updateTodo = (req, res) => {
    const id = Number(req.params.id);
    const { title, status } = req.body;

    if (!title && !status) {
        return res.status(400).json({ error: "Provide at least title or status to update" });
    }

    if (status && !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({
            error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`,
        });
    }

    const todos = readTodos();
    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ error: `Todo with ID ${id} not found` });
    }

    if (title && typeof title === "string" && title.trim()) {
        todos[todoIndex].title = title.trim();
    }

    if (status) {
        todos[todoIndex].status = status;
    }

    writeTodos(todos);

    return res.status(200).json(todos[todoIndex]);
};

// DELETE /todos/:id
const deleteTodo = (req, res) => {
    const id = Number(req.params.id);
    const todos = readTodos();

    const todoIndex = todos.findIndex((t) => t.id === id);

    if (todoIndex === -1) {
        return res.status(404).json({ error: `Todo with ID ${id} not found` });
    }

    const [deletedTodo] = todos.splice(todoIndex, 1);
    writeTodos(todos);

    return res.status(200).json({
        message: "Todo deleted successfully",
        deletedTodo,
    });
};

module.exports = {
    createTodo,
    getAllTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
};