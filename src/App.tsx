import { useState } from "react";
import { useTasks } from "./hooks/useTaskHooks";


export default function App() {
  const { tasks, addTask, updateTask, deleteTask, clearAllTasks } = useTasks();
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState<number | null>(null);

  const addOrUpdateTask = () => {
    if (newTask.trim() === "") return;

    if (editTask !== null) {
      updateTask(editTask, newTask);
      setEditTask(null);
    } else {
      addTask(newTask);
    }

    setNewTask("");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Todo App</h1>
      <div className="w-64 mb-4">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="w-full p-2 rounded border"
        />
      </div>
      <button
        onClick={addOrUpdateTask}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {editTask !== null ? "Update Task" : "Add Task"}
      </button>

      <button
        onClick={clearAllTasks}
        className="bg-red-500 text-white p-2 rounded mt-4 hover:bg-red-600"
      >
        Clear All Tasks and LocalStorage
      </button>

      <ul className="mt-6">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="bg-white p-2  my-2 flex justify-between items-center rounded shadow"
          >
            {task}
            <div className="mx-20">
              <button
                onClick={() => setEditTask(index)}
                className="bg-blue-500 text-white p-1 rounded mr-2 hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(index)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
