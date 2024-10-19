
# Task Manager

A simple Task Manager application built with React. This app allows users to create, edit, complete, and delete tasks, with support for prioritization and search functionality.

## Features

- Add tasks with titles, descriptions, and priority levels (High, Medium, Low).
- Mark tasks as completed or pending.
- Delete tasks with confirmation.
- Search tasks by title or description, with highlighted search terms.
- Persist tasks in local storage.

## Technologies Used

- React
- JavaScript
- CSS
- React Icons

## Installation

To set up and run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Gnv1996/task-manager.git
   cd task-manager

   ```
   
2. **Install Node modules :**
Run the following command to install the necessary Node modules listed in package.json:
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```
3. **Run the development server :**

```bash
npm run dev
```

4. **Open your browser :**

Navigate to http://localhost:3000 to see the application running.


### Explanation:
- **Step 2:** Clearly states that users need to run the `npm install` command (and alternatives) to install all the dependencies listed in the `package.json` file. This ensures that they have all the required packages to run your project successfully.
- **Using Code Blocks:** The commands are enclosed in code blocks for better readability, making it easier for users to follow.

Feel free to adjust any details, like the repository URL or commands, to fit your project!





## Sorting Tasks by Priority
The Task Manager application sorts tasks based on their priority levels: High, Medium, and Low. This sorting mechanism enhances user experience by displaying tasks in order of importance.

1. **Priority Order Definition :**
The priority order is defined using an array:
```bash
const priorityOrder = ['high', 'medium', 'low'];
```
2. **Sorting Logic :**
The application utilizes the Array.sort() method to sort tasks. The sorting function compares the indices of each task's priority against the priorityOrder array. This is achieved with the following code:
```bash
const sortedTasks = filteredTasks.sort((a, b) => 
    priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority)
);
```

2. **Result :**
As a result, tasks are displayed with high-priority tasks appearing first, followed by medium and low-priority tasks. This structured approach ensures that users can quickly identify and focus on the most critical tasks.
