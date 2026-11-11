import { useCallback, useState } from "react";

import { taskService } from "../services/taskService";
import type { Task } from "../types";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => taskService.getAll());

  const refresh = useCallback(() => {
    setTasks(taskService.getAll());
  }, []);

  const addTask = useCallback(
    (task: Omit<Task, "id">) => {
      taskService.create(task);
      refresh();
    },
    [refresh],
  );

  const updateTask = useCallback(
    (id: number, updates: Partial<Task>) => {
      taskService.update(id, updates);
      refresh();
    },
    [refresh],
  );

  const deleteTask = useCallback(
    (id: number) => {
      taskService.delete(id);
      refresh();
    },
    [refresh],
  );

  const toggleTaskStatus = useCallback(
    (id: number) => {
      const task = taskService.getById(id);

      if (!task) return;

      taskService.update(id, {
        status: task.status === "completed" ? "pending" : "completed",
      });
      refresh();
    },
    [refresh],
  );

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };
}
