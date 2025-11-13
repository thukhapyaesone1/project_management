// API helper functions

// -------------------- PROJECTS --------------------

// Add a new project
const addNewProject = async (projectData) => {
  try {
    const res = await fetch("http://localhost:3001/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(projectData),
    });

    if (!res.ok) throw new Error("Failed to add project");

    console.log("✅ Project added successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to add project:", error);
    return false;
  }
};

// Get all projects
const getProjects = async () => {
  try {
    const res = await fetch("http://localhost:3001/projects");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    console.log("✅ Fetched projects:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to fetch projects:", error);
    return [];
  }
};

// Update a project
const updateProject = async (id, updatedData) => {
  try {
    const res = await fetch(`http://localhost:3001/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update project");

    console.log(`✅ Project ${id} updated successfully`);
    return true;
  } catch (error) {
    console.error("❌ Failed to update project:", error);
    return false;
  }
};

// Delete a project
const deleteProject = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/projects/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete project");

    console.log(`✅ Project ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("❌ Failed to delete project:", error);
    return false;
  }
};

// -------------------- TASKS --------------------

// Get all tasks for a project
const getTasks = async (projectId) => {
  try {
    const res = await fetch(`http://localhost:3001/projects/${projectId}/tasks`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    console.log("✅ Fetched tasks:", data);
    return data;
  } catch (error) {
    console.error("❌ Failed to fetch tasks:", error);
    return [];
  }
};

// Add a new task
const addNewTask = async (taskData) => {
  try {
    const res = await fetch("http://localhost:3001/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    });

    if (!res.ok) throw new Error("Failed to add task");

    console.log("✅ Task added successfully");
    return true;
  } catch (error) {
    console.error("❌ Failed to add task:", error);
    return false;
  }
};

// Update a task
const updateTask = async (id, updatedData) => {
  try {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) throw new Error("Failed to update task");

    console.log(`✅ Task ${id} updated successfully`);
    return true;
  } catch (error) {
    console.error("❌ Failed to update task:", error);
    return false;
  }
};

// Delete a task
const deleteTask = async (id) => {
  try {
    const res = await fetch(`http://localhost:3001/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete task");

    console.log(`✅ Task ${id} deleted successfully`);
    return true;
  } catch (error) {
    console.error("❌ Failed to delete task:", error);
    return false;
  }
};

// Search 
const search = async (keyword) =>{
  try{
      const res = await fetch(`http://localhost:3001/search?q=${keyword}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    console.log("✅ Fetched tasks:", data);
    return data;

  }catch (error) {
        console.error("❌ Failed to search:", error);
return null;
  }
}

// -------------------- EXPORTS --------------------
export {
  addNewProject,
  getProjects,
  updateProject,
  deleteProject,
  getTasks,
  addNewTask,
  updateTask,
  deleteTask,
  search,
};
