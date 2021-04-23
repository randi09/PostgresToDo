const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 3001;
const pool = require("./db1.js");

// middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to node server");
});

// Create a todo item
app.post("/createToDo", async (req, res) => {
  try {
    const { description } = req.body;

    const createToDo = await pool.query(
      "INSERT INTO todoitems (description) VALUES ($1)",
      [description]
    );
    res.json(createToDo);
  } catch (err) {
    console.log(err.message);
  }
});

// Updating the todo list
app.put("/todoitems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todoitems SET description = $1 WHERE id =($2)",
      [description, id]
    );
    res.json(updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// // Read todo item
app.get("/read", async (req, res) => {
  try {
    const readToDo = await pool.query("SELECT * FROM todoitems WHERE id=1");
    res.json(readToDo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// // Delete todo item
app.delete("/delete_todoitems/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("Todo was successfully deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
