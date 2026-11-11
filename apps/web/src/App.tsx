import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import StatCard from "./components/dashboard/StatCard";
import TodaySchedule from "./components/dashboard/TodaySchedule";
import TasksPanel from "./components/tasks/TasksPanel";
import { schedule } from "./data/mockData";
import {
  countClasses,
  countPendingTasks,
  formatStudyTime,
} from "./data/dashboardStats";
import { useTasks } from "./hooks/useTasks";

import {
  CheckSquare,
  Clock,
  GraduationCap,
} from "lucide-react";

function App() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } =
    useTasks();

  const pendingTasks = countPendingTasks(tasks);
  const studyTime = formatStudyTime(schedule);
  const classesToday = countClasses(schedule);
  return (
    <div className="min-h-screen bg-slate-950 flex">

      <Sidebar />

      <main className="flex-1 min-w-0">

        <Header />

        <div className="p-8 max-w-7xl mx-auto">

          <div className="mb-8">

            <h1 className="text-3xl font-bold text-white">
              Good afternoon!
            </h1>

            <p className="text-slate-400 mt-2">
              Here's what's happening with your university life.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

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

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <TodaySchedule events={schedule} />

            <TasksPanel
              tasks={tasks}
              onAdd={addTask}
              onUpdate={updateTask}
              onDelete={deleteTask}
              onToggleStatus={toggleTaskStatus}
            />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;