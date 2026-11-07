import {
  LayoutDashboard,
  CalendarDays,
  CheckSquare,
  BookOpen,
  Clock,
  Settings,
  GraduationCap,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Calendar", icon: CalendarDays },
  { name: "Tasks", icon: CheckSquare },
  { name: "Subjects", icon: BookOpen },
  { name: "Schedule", icon: Clock },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 border-r border-slate-800 p-5 flex flex-col">

      <div className="flex items-center gap-3 mb-12">
        <div className="bg-indigo-500 p-2 rounded-xl">
          <GraduationCap size={24} className="text-white" />
        </div>

        <h1 className="text-xl font-bold text-white">
          UniFlow
        </h1>
      </div>

      <nav className="flex-1 space-y-2">

        <p className="text-xs text-slate-500 uppercase mb-4">
          Workspace
        </p>

        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                index === 0
                  ? "bg-indigo-500/15 text-indigo-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={19} />
              <span className="text-sm">{item.name}</span>
            </button>
          );
        })}

      </nav>

      <button className="flex items-center gap-3 text-slate-400 hover:text-white p-3">
        <Settings size={19} />
        Settings
      </button>

    </aside>
  );
}
