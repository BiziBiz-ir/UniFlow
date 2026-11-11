import { useMemo, useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PageHeader from "../components/layout/PageHeader";
import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types";

const TODAY = new Date();
const INITIAL_MONTH = startOfMonth(TODAY);
const WEEK_OPTIONS = { weekStartsOn: 1 as const };
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const priorityDot = {
  high: "bg-red-400",
  medium: "bg-yellow-400",
  low: "bg-green-400",
} as const;

const priorityOrder = { high: 0, medium: 1, low: 2 } as const;

export default function Calendar() {
  const { tasks } = useTasks();
  const [month, setMonth] = useState(INITIAL_MONTH);

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), WEEK_OPTIONS),
    end: endOfWeek(endOfMonth(month), WEEK_OPTIONS),
  });

  const tasksByDay = useMemo(() => {
    const map = new Map<string, Task[]>();

    for (const task of tasks) {
      const date = parseISO(task.deadline);

      if (Number.isNaN(date.getTime())) continue;

      const key = format(date, "yyyy-MM-dd");
      const dayTasks = map.get(key) ?? [];

      dayTasks.push(task);
      map.set(key, dayTasks);
    }

    return map;
  }, [tasks]);

  return (
    <div>
      <PageHeader
        title="Calendar"
        description="Task deadlines across the month, grouped by priority."
      />

      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">

          <div>
            <h2 className="text-lg font-semibold text-white">
              {format(month, "MMMM yyyy")}
            </h2>

            <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
              {(["high", "medium", "low"] as const).map((priority) => (
                <span key={priority} className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${priorityDot[priority]}`}
                  />
                  {priority}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMonth(subMonths(month, 1))}
              aria-label="Previous month"
              className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => setMonth(INITIAL_MONTH)}
              className="rounded-lg border border-slate-800 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Today
            </button>

            <button
              type="button"
              onClick={() => setMonth(addMonths(month, 1))}
              aria-label="Next month"
              className="rounded-lg border border-slate-800 p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            >
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

        <div className="overflow-x-auto">
          <div className="grid min-w-[640px] grid-cols-7 gap-px overflow-hidden rounded-xl bg-slate-800">

            {WEEKDAYS.map((weekday) => (
              <div
                key={weekday}
                className="bg-slate-900 px-2 py-2 text-center text-xs font-medium uppercase text-slate-500"
              >
                {weekday}
              </div>
            ))}

            {days.map((day) => {
              const dayTasks = (
                tasksByDay.get(format(day, "yyyy-MM-dd")) ?? []
              )
                .slice()
                .sort(
                  (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority],
                );

              const inMonth = isSameMonth(day, month);

              return (
                <div
                  key={day.toISOString()}
                  className={`min-h-24 p-1.5 ${
                    inMonth ? "bg-slate-900" : "bg-slate-950/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                        isSameDay(day, TODAY)
                          ? "bg-indigo-500 font-semibold text-white"
                          : inMonth
                            ? "text-slate-300"
                            : "text-slate-600"
                      }`}
                    >
                      {format(day, "d")}
                    </span>

                    {dayTasks.length > 0 && (
                      <span className="text-[10px] text-slate-500">
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-1">
                    {dayTasks.slice(0, 2).map((task) => (
                      <div
                        key={task.id}
                        title={`${task.title} — ${task.subject}`}
                        className={`flex items-center gap-1 rounded px-1 py-0.5 text-[11px] ${
                          task.status === "completed"
                            ? "text-slate-500 line-through"
                            : "text-slate-300"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${priorityDot[task.priority]}`}
                        />
                        <span className="truncate">{task.title}</span>
                      </div>
                    ))}

                    {dayTasks.length > 2 && (
                      <p className="px-1 text-[10px] text-slate-500">
                        +{dayTasks.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </section>
    </div>
  );
}
