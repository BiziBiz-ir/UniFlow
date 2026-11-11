import { useMemo } from "react";
import { BookOpen } from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types";

const priorityDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-green-400",
} as const;

export default function Subjects() {
  const { tasks } = useTasks();

  const subjects = useMemo(() => {
    const groups = new Map<string, Task[]>();

    for (const task of tasks) {
      const subjectTasks = groups.get(task.subject) ?? [];

      subjectTasks.push(task);
      groups.set(task.subject, subjectTasks);
    }

    return [...groups.entries()]
      .map(([name, subjectTasks]) => ({
        name,
        tasks: subjectTasks,
        completed: subjectTasks.filter((task) => task.status === "completed")
          .length,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [tasks]);

  return (
    <div>
      <PageHeader
        title="Subjects"
        description="Your courses and how many tasks you've completed in each."
      />

      {subjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-800 px-6 py-16 text-center">
          <BookOpen size={30} className="mx-auto text-slate-600" />
          <p className="mt-3 text-sm text-slate-400">No subjects yet</p>
          <p className="mt-1 text-xs text-slate-500">
            Add a task with a subject and it will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {subjects.map(({ name, tasks: subjectTasks, completed }) => {
            const percent = Math.round((completed / subjectTasks.length) * 100);

            return (
              <section
                key={name}
                className="rounded-2xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold text-white">{name}</h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {subjectTasks.length} tasks · {completed} completed
                    </p>
                  </div>

                  <span className="rounded-xl bg-indigo-500/10 p-2 text-indigo-400">
                    <BookOpen size={18} />
                  </span>
                </div>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  {percent}% complete
                </p>

                <ul className="mt-4 space-y-2">
                  {subjectTasks.slice(0, 3).map((task) => (
                    <li
                      key={task.id}
                      className="flex items-center gap-2 text-xs"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                          task.status === "completed"
                            ? "bg-emerald-400"
                            : priorityDot[task.priority]
                        }`}
                      />
                      <span
                        className={`truncate ${
                          task.status === "completed"
                            ? "text-slate-500 line-through"
                            : "text-slate-300"
                        }`}
                      >
                        {task.title}
                      </span>
                    </li>
                  ))}

                  {subjectTasks.length > 3 && (
                    <li className="text-xs text-slate-500">
                      +{subjectTasks.length - 3} more
                    </li>
                  )}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
