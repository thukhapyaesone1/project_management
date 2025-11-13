import cors from "cors";
import express from "express";
import sqlite3 from "sqlite3";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to SQLite
const db = new sqlite3.Database("./projects.sqlite", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database");
});

// Create tables if not exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      deadline TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER,
      name TEXT,
      assigned_to TEXT,
      status TEXT,
      FOREIGN KEY(project_id) REFERENCES projects(id)
    )
  `);
});

// ---------------------- PROJECT ROUTES ----------------------

// Get all projects
app.get("/projects", (req, res) => {
  db.all("SELECT * FROM projects", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Create new project
app.post("/projects", (req, res) => {
  const { title, description, deadline } = req.body;
  db.run(
    "INSERT INTO projects (title, description, deadline) VALUES (?, ?, ?)",
    [title, description, deadline],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else {
        console.log("✅ Inserted project with ID:", this.lastID);
        res.json({ id: this.lastID, title, description, deadline });
      }
    }
  );
});

// Update project
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;

  db.run(
    "UPDATE projects SET title = ?, description = ?, deadline = ? WHERE id = ?",
    [title, description, deadline, id],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else if (this.changes === 0)
        res.status(404).json({ error: "Project not found" });
      else res.json({ id, title, description, deadline });
    }
  );
});

// Delete project (and its tasks)
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;

  // First delete related tasks
  db.run("DELETE FROM tasks WHERE project_id = ?", [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });

    // Then delete the project
    db.run("DELETE FROM projects WHERE id = ?", [id], function (err) {
      if (err) res.status(500).json({ error: err.message });
      else if (this.changes === 0)
        res.status(404).json({ error: "Project not found" });
      else res.json({ message: "Project and related tasks deleted successfully" });
    });
  });
});

// ---------------------- TASK ROUTES ----------------------

// Get all tasks
app.get("/tasks", (req, res) => {
  db.all("SELECT * FROM tasks", [], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// Create new task
app.post("/tasks", (req, res) => {
  const { name, assigned_to, status, project_id } = req.body;
  db.run(
    "INSERT INTO tasks (name, assigned_to, status, project_id) VALUES (?, ?, ?, ?)",
    [name, assigned_to, status, project_id],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else res.json({ id: this.lastID, name, assigned_to, status, project_id });
    }
  );
});

// Update task
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { name, assigned_to, status } = req.body;

  db.run(
    "UPDATE tasks SET name = ?, assigned_to = ?, status = ? WHERE id = ?",
    [name, assigned_to, status, id],
    function (err) {
      if (err) res.status(500).json({ error: err.message });
      else if (this.changes === 0)
        res.status(404).json({ error: "Task not found" });
      else res.json({ id, name, assigned_to, status });
    }
  );
});

// Delete task
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM tasks WHERE id = ?", [id], function (err) {
    if (err) res.status(500).json({ error: err.message });
    else if (this.changes === 0)
      res.status(404).json({ error: "Task not found" });
    else res.json({ message: "Task deleted successfully" });
  });
});

// Get tasks by project ID
app.get("/projects/:projectId/tasks", (req, res) => {
  const { projectId } = req.params;
  db.all("SELECT * FROM tasks WHERE project_id = ?", [projectId], (err, rows) => {
    if (err) res.status(500).json({ error: err.message });
    else res.json(rows);
  });
});

// ---------------------- SEARCH ROUTE ----------------------

// Search projects and tasks by keyword
app.get("/search", (req, res) => {
  const { q } = req.query; // ?q=keyword

  if (!q || q.trim() === "") {
    return res.status(400).json({ error: "Search query is required" });
  }

  const keyword = `%${q}%`;

  const results = {
    projects: [],
    tasks: [],
  };

  // Search in projects (title or description)
  db.all(
    "SELECT * FROM projects WHERE title LIKE ?",
    [keyword],
    (err, projectRows) => {
      if (err) return res.status(500).json({ error: err.message });
      results.projects = projectRows;

      // Search in tasks (name, assigned_to, or status)
      db.all(
        "SELECT * FROM tasks WHERE name LIKE ? OR assigned_to LIKE ? OR status LIKE ?",
        [keyword, keyword, keyword],
        (err, taskRows) => {
          if (err) return res.status(500).json({ error: err.message });
          results.tasks = taskRows;

          // Send both results together
          res.json(results);
        }
      );
    }
  );
});


app.listen(3001, () => console.log("Server running on http://localhost:3001"));
