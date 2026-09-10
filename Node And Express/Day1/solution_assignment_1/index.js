const { Command } = require("commander");
const program = new Command();

const { add } = require("./src/commands/add.js");
const { list } = require("./src/commands/list.js");
const { update } = require("./src/commands/update.js");
const { deleteTodo } = require("./src/commands/delete.js");

program
  .name("todo-cli")
  .description("A simple CLI to manage your todo list")
  .version("1.0.0");

program
  .command("add <title>")
  .description("Add a new todo item")
  .action((title) => {
    add(title);
  });

program
  .command("list")
  .description("List all todos or filter by status")
  .option("-s, --status <status>", "Filter by status: to-do, in progress, done")
  .action((options) => {
    list(options.status);
  });

program
  .command("edit")
  .description("Edit todo title and/or status")
  .requiredOption("--id <id>", "Todo ID")
  .option("-t, --title <title>", "New title")
  .option("-s, --status <status>", "New status: to-do, in progress, done")
  .action((options) => {
    update({
      id: options.id,
      title: options.title,
      status: options.status,
    });
  });

program
  .command("delete <id>")
  .description("Delete a todo by ID")
  .action((id) => {
    deleteTodo(id);
  });

program.parse(process.argv);