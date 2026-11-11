import { Clock, GraduationCap, BookOpen, Briefcase } from "lucide-react";

import TodaySchedule from "../components/dashboard/TodaySchedule";
import PageHeader from "../components/layout/PageHeader";
import { formatStudyTime } from "../data/dashboardStats";
import { schedule } from "../data/mockData";

export default function Schedule() {
  const classes = schedule.filter((event) => event.type === "class").length;
  const studyBlocks = schedule.filter((event) => event.type === "study").length;
  const workBlocks = schedule.filter((event) => event.type === "work").length;

  const rows = [
    {
      label: "Study time",
      value: formatStudyTime(schedule),
      icon: Clock,
      color: "text-indigo-400",
    },
    {
      label: "Classes",
      value: String(classes),
      icon: GraduationCap,
      color: "text-blue-400",
    },
    {
      label: "Study blocks",
      value: String(studyBlocks),
      icon: BookOpen,
      color: "text-indigo-400",
    },
    {
      label: "Work blocks",
      value: String(workBlocks),
      icon: Briefcase,
      color: "text-emerald-400",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Schedule"
        description="Your daily plan of classes, study blocks and work."
      />

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <TodaySchedule events={schedule} />
        </div>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="text-lg font-semibold text-white">Overview</h2>

          <dl className="mt-5 space-y-4">
            {rows.map(({ label, value, icon: Icon, color }) => (
              <div
                key={label}
                className="flex items-center justify-between gap-3"
              >
                <dt className="flex items-center gap-2 text-sm text-slate-400">
                  <Icon size={17} className={color} />
                  {label}
                </dt>
                <dd className="text-sm font-semibold text-white">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-6 border-t border-slate-800 pt-4">
            <p className="mb-3 text-xs uppercase text-slate-400">Legend</p>

            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-1 rounded-full bg-blue-500" />
                Class
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-1 rounded-full bg-indigo-500" />
                Study
              </li>
              <li className="flex items-center gap-2">
                <span className="h-2.5 w-1 rounded-full bg-emerald-500" />
                Work
              </li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
