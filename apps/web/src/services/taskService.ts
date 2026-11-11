import type { Task } from "../types";
import { tasks as initialTasks } from "../data/mockData";

const STORAGE_KEY = "uniflow.tasks.v1";

const priorities = new Set(["low", "medium", "high"]);
const statuses = new Set(["pending", "in-progress", "completed"]);

function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) return false;

  const task = value as Record<string, unknown>;

  return (
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    typeof task.subject === "string" &&
    typeof task.deadline === "string" &&
    typeof task.priority === "string" &&
    priorities.has(task.priority) &&
    typeof task.status === "string" &&
    statuses.has(task.status)
  );
}

function loadTasks(): Task[] {
  if (typeof window === "undefined") return [...initialTasks];

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) return [...initialTasks];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed) || !parsed.every(isTask)) {
      return [...initialTasks];
    }

    return parsed;
  } catch {
    return [...initialTasks];
  }
}

function saveTasks(nextTasks: Task[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextTasks));
  } catch {
    // Storage can be unavailable (private mode, quota); keep the in-memory copy.
  }
}

let tasks: Task[] = loadTasks();

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
    saveTasks(tasks);

    return newTask;
  },

  update(id: number, updates: Partial<Task>): Task | undefined {
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) return undefined;

    tasks[index] = {
      ...tasks[index],
      ...updates,
    };
    saveTasks(tasks);

    return tasks[index];
  },

  delete(id: number): boolean {
    const previousLength = tasks.length;

    tasks = tasks.filter((task) => task.id !== id);
    saveTasks(tasks);

    return tasks.length < previousLength;
  },
};
