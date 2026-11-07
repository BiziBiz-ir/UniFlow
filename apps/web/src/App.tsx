import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

import StatCard from "./components/dashboard/StatCard";
import TodaySchedule from "./components/dashboard/TodaySchedule";
import UpcomingTasks from "./components/dashboard/UpcomingTasks";

import {
  CheckSquare,
  Clock,
  GraduationCap,
} from "lucide-react";

function App() {
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
              value="4"
              description="Tasks waiting for completion"
              icon={CheckSquare}
            />

            <StatCard
              title="Study Time"
              value="3.5h"
              description="Planned for today"
              icon={Clock}
            />

            <StatCard
              title="Classes"
              value="2"
              description="University classes today"
              icon={GraduationCap}
            />

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

            <TodaySchedule />

            <UpcomingTasks />

          </div>

        </div>

      </main>

    </div>
  );
}

export default App;