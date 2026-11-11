import type { Task } from "../../types";

export default function UpcomingTasks({ tasks }: { tasks: Task[] }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <h3 className="text-white font-semibold text-lg mb-6">
        Upcoming Tasks
      </h3>

      <div className="space-y-5">

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between gap-4"
          >

            <div>
              <p className="text-white text-sm font-medium">
                {task.title}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {task.subject} · Due {task.deadline}
              </p>
            </div>

            <span
              className={`text-xs px-3 py-1 rounded-full ${
                task.priority === "high"
                  ? "bg-red-500/10 text-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-500/10 text-yellow-400"
                  : "bg-green-500/10 text-green-400"
              }`}
            >
              {task.priority}
            </span>

          </div>
        ))}

      </div>

    </section>
  );
}