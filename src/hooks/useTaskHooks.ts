import { useState, useEffect } from "react";

// Custom hook for managing tasks
export function useTasks() {
  const [tasks, setTasks] = useState<string[]>(
    () => JSON.parse(localStorage.getItem("tasks") || "[]") // Initialize with data from localStorage
  );

  useEffect(() => {
    // Save tasks to localStorage whenever tasks change
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: string) => {
    if (newTask.trim() === "") return;

    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const updateTask = (index: number, updatedTask: string) => {
    if (updatedTask.trim() === "") return;

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[index] = updatedTask;
      return updatedTasks;
    });
  };

  const deleteTask = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.filter((_, i) => i !== index)
    );
  };

  const clearAllTasks = () => {
    localStorage.removeItem("tasks");
    setTasks([]);
  };

  return { tasks, addTask, updateTask, deleteTask, clearAllTasks };
}
