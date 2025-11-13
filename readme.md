# React Project Dashboard

A modern **Project Management Dashboard** built with **React**, **Material UI**, and **Express.js**.
It allows users to manage projects and tasks efficiently, featuring project creation, task assignment, and a dynamic search system connected to an SQLite backend.

---

## 🚀 Features

- **Create, Edit, and Delete Projects**
- **Add and Manage Tasks** under each project
- **Search Functionality** for projects and tasks
- **Task Filtering** by status (Pending / In Progress / Completed)
- **Responsive UI** built with Material UI (MUI)
- **SQLite Database** for lightweight, local data storage
- **Express.js API** for backend communication
- **Live Refresh** after adding or editing projects and tasks

---

## Demonstration Video Link

<https://drive.google.com/file/d/1bRan8pLkZkmb8NkiWD_IlTqf-iP4bQSV/view?usp=sharing>

## ⚙️ Installation

1. Clone the repository:

    ```bash
   git clone https://github.com/thukhapyaesone1/project_management.git

   cd react-project-dashboard

## Dependencies (Frontend)

| Package                 | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| **react**               | Core React library for building the UI                    |
| **react-dom**           | React DOM renderer for web apps                           |
| **@mui/material**       | Material UI components for styling                        |
| **@mui/icons-material** | Material UI icon set                                      |
| **@mui/x-date-pickers** | Date and time picker components from MUI                  |
| **@emotion/react**      | CSS-in-JS styling library required by MUI                 |
| **@emotion/styled**     | Styled components API used by MUI                         |
| **dayjs**               | Lightweight JavaScript library for date/time manipulation |

## Dependencies (Backend)

| Package     | Description                                                   |
| ----------- | ------------------------------------------------------------- |
| **express** | Fast and minimal Node.js web framework for building REST APIs |
| **cors**    | Middleware for enabling Cross-Origin Resource Sharing (CORS)  |
| **sqlite3** | Lightweight SQL database engine for local data storage        |

## Setup Frontend and backend

```bash
cd client
npm install
node index.js

cd ../server
npm install
npm run dev
