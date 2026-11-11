import { useMemo, useState } from "react";
import { Inbox, Plus } from "lucide-react";

import type { Task, TaskStatus } from "../../types";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

type TaskFilter = "all" | TaskStatus;

const filters: { value: TaskFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
];

interface TasksPanelProps {
  tasks: Task[];
  onAdd: (task: Omit<Task, "id">) => void;
  onUpdate: (id: number, updates: Partial<Task>) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export default function TasksPanel({
  tasks,
  onAdd,
  onUpdate,
  onDelete,
  onToggleStatus,
}: TasksPanelProps) {
  const [filter, setFilter] = useState<TaskFilter>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const counts = useMemo<Record<TaskFilter, number>>(
    () => ({
      all: tasks.length,
      pending: tasks.filter((task) => task.status === "pending").length,
      "in-progress": tasks.filter((task) => task.status === "in-progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    }),
    [tasks],
  );

  const visibleTasks = useMemo(() => {
    const filtered =
      filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

    return [...filtered].sort((a, b) => {
      const aCompleted = a.status === "completed" ? 1 : 0;
      const bCompleted = b.status === "completed" ? 1 : 0;

      if (aCompleted !== bCompleted) return aCompleted - bCompleted;

      return a.deadline.localeCompare(b.deadline);
    });
  }, [tasks, filter]);

  const openTasks = counts.pending + counts["in-progress"];

  function openCreate() {
    setEditingTask(null);
    setFormOpen(true);
  }

  function openEdit(task: Task) {
    setEditingTask(task);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingTask(null);
  }

  function handleSubmit(values: Omit<Task, "id">) {
    if (editingTask) {
      onUpdate(editingTask.id, values);
    } else {
      onAdd(values);
    }

    closeForm();
  }

  function handleDelete(task: Task) {
    if (window.confirm(`Delete "${task.title}"?`)) {
      onDelete(task.id);
    }
  }

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold text-lg">Tasks</h3>
          <p className="mt-1 text-xs text-slate-500">
            {openTasks} open · {counts.completed} completed
          </p>
        </div>

        <button
          type="button"
          onClick={openCreate}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
        >
          <Plus size={16} />
          Add task
        </button>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
              filter === value
                ? "bg-indigo-500/15 text-indigo-300"
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            {label}
            <span
              className={`ml-1.5 ${
                filter === value ? "text-indigo-300/70" : "text-slate-600"
              }`}
            >
              {counts[value]}
            </span>
          </button>
        ))}
      </div>

      {visibleTasks.length > 0 ? (
        <div className="space-y-1">
          {visibleTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleStatus}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-800 px-6 py-10 text-center">
          <Inbox size={28} className="text-slate-600" />
          <p className="mt-3 text-sm text-slate-400">No tasks here</p>
          <p className="mt-1 text-xs text-slate-500">
            {filter === "all"
              ? "Add your first task to get started."
              : `No ${filter.replace("-", " ")} tasks.`}
          </p>
        </div>
      )}

      {formOpen && (
        <TaskForm task={editingTask} onClose={closeForm} onSubmit={handleSubmit} />
      )}

    </section>
  );
}
