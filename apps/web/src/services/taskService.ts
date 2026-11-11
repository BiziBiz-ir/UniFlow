import type { Task } from "../types";
import { tasks as initialTasks } from "../data/mockData";

let tasks: Task[] = [...initialTasks];

export const taskService = {
  getAll(): Task[] {
    return [...tasks];
  },

  getById(id: number): Task | undefined {
    return tasks.find((task) => task.id === id);
  },

  create(task: Omit<Task, "id">): Task {
    const newTask: Task = {
      ...task,
      id: Date.now(),
    };

    tasks.push(newTask);

    return newTask;
  },

  update(id: number, updates: Partial<Task>): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) return undefined;

    tasks[index] = {
      ...tasks[index],
      ...updates,
    };

    return tasks[index];
  },

  delete(id: number): boolean {
    const previousLength = tasks.length;

    tasks = tasks.filter((task) => task.id !== id);

    return tasks.length < previousLength;
  },
};
