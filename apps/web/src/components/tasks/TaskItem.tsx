import { CalendarDays, Check, Pencil, Trash2 } from "lucide-react";

import type { Task } from "../../types";
import { formatDeadline, isOverdue } from "../../utils/date";

const priorityStyles = {
  high: "bg-red-500/10 text-red-400",
  medium: "bg-yellow-500/10 text-yellow-400",
  low: "bg-green-500/10 text-green-400",
} as const;

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export default function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  const completed = task.status === "completed";
  const overdue = !completed && isOverdue(task.deadline);

  return (
    <div className="group flex items-start gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-800/40">

      <button
        type="button"
        role="checkbox"
        aria-checked={completed}
        aria-label={
          completed
            ? `Mark "${task.title}" as pending`
            : `Mark "${task.title}" as completed`
        }
        onClick={() => onToggle(task.id)}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition ${
          completed
            ? "border-emerald-500 bg-emerald-500 text-slate-950"
            : "border-slate-600 text-transparent hover:border-indigo-400"
        }`}
      >
        <Check size={13} strokeWidth={3} />
      </button>

      <div className="min-w-0 flex-1">
        <p
          className={`truncate text-sm font-medium ${
            completed ? "text-slate-500 line-through" : "text-white"
          }`}
        >
          {task.title}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
          <span className="truncate">{task.subject}</span>
          <span aria-hidden="true">·</span>
          <CalendarDays size={12} className="shrink-0" />
          <span className={overdue ? "text-red-400" : undefined}>
            Due {formatDeadline(task.deadline)}
          </span>
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1.5">

        <span
          className={`rounded-full px-2.5 py-0.5 text-xs ${
            priorityStyles[task.priority]
          }`}
        >
          {task.priority}
        </span>

        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit "${task.title}"`}
          className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-white"
        >
          <Pencil size={15} />
        </button>

        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete "${task.title}"`}
          className="rounded-md p-1.5 text-slate-500 transition hover:bg-slate-800 hover:text-red-400"
        >
          <Trash2 size={15} />
        </button>

      </div>

    </div>
  );
}
