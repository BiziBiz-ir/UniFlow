import { CheckSquare, Clock, GraduationCap } from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import TodaySchedule from "../components/dashboard/TodaySchedule";
import TasksPanel from "../components/tasks/TasksPanel";
import {
  countClasses,
  countPendingTasks,
  formatStudyTime,
} from "../data/dashboardStats";
import { schedule } from "../data/mockData";
import { useTasks } from "../hooks/useTasks";

function getGreeting(date: Date): string {
  const hour = date.getHours();

  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";

  return "Good evening";
}

const GREETING = getGreeting(new Date());

export default function Dashboard() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } =
    useTasks();

  const pendingTasks = countPendingTasks(tasks);
  const studyTime = formatStudyTime(schedule);
  const classesToday = countClasses(schedule);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          {GREETING}!
        </h1>

        <p className="mt-2 text-slate-400">
          Here's what's happening with your university life.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">

        <StatCard
          title="Pending Tasks"
          value={String(pendingTasks)}
          description="Tasks waiting for completion"
          icon={CheckSquare}
        />

        <StatCard
          title="Study Time"
          value={studyTime}
          description="Planned for today"
          icon={Clock}
        />

        <StatCard
          title="Classes"
          value={String(classesToday)}
          description="University classes today"
          icon={GraduationCap}
        />

      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <TodaySchedule events={schedule} />

        <TasksPanel
          tasks={tasks}
          onAdd={addTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
          onToggleStatus={toggleTaskStatus}
        />

      </div>
    </>
  );
}
