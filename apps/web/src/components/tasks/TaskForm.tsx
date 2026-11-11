import { useEffect, useState, type FormEvent } from "react";
import { format } from "date-fns";
import { X } from "lucide-react";

import type { Priority, Task, TaskStatus } from "../../types";

const priorities: Priority[] = ["low", "medium", "high"];
const statuses: TaskStatus[] = ["pending", "in-progress", "completed"];

// Computed once at module load so the form has a sensible default date.
const DEFAULT_DEADLINE = format(new Date(), "yyyy-MM-dd");

const fieldClass =
  "w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40";

const labelClass = "mb-1.5 block text-sm font-medium text-slate-300";

interface TaskFormProps {
  task?: Task | null;
  onClose: () => void;
  onSubmit: (values: Omit<Task, "id">) => void;
}

export default function TaskForm({ task, onClose, onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [subject, setSubject] = useState(task?.subject ?? "");
  const [deadline, setDeadline] = useState(task?.deadline ?? DEFAULT_DEADLINE);
  const [priority, setPriority] = useState<Priority>(task?.priority ?? "medium");
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "pending");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedSubject = subject.trim();

    if (!trimmedTitle || !trimmedSubject || !deadline) {
      setError("Title, subject and due date are required.");
      return;
    }

    onSubmit({
      title: trimmedTitle,
      subject: trimmedSubject,
      deadline,
      priority,
      status,
    });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-form-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-slate-950/80 backdrop-blur-sm"
      />

      <div className="relative w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">

        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 id="task-form-title" className="text-lg font-semibold text-white">
              {task ? "Edit task" : "New task"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {task
                ? "Update the details for this task."
                : "Add a task to your workspace."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <label className="block">
            <span className={labelClass}>Title</span>
            <input
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="e.g. Finish the data structures assignment"
              className={fieldClass}
            />
          </label>

          <label className="block">
            <span className={labelClass}>Subject</span>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="e.g. Data Structures"
              className={fieldClass}
            />
          </label>

          <div className="grid grid-cols-2 gap-4">

            <label className="block">
              <span className={labelClass}>Due date</span>
              <input
                type="date"
                value={deadline}
                onChange={(event) => setDeadline(event.target.value)}
                className={fieldClass}
              />
            </label>

            <label className="block">
              <span className={labelClass}>Priority</span>
              <select
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value as Priority)
                }
                className={fieldClass}
              >
                {priorities.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>

          </div>

          <label className="block">
            <span className={labelClass}>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className={fieldClass}
            >
              {statuses.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400"
            >
              {task ? "Save changes" : "Add task"}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
