import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8">

      <div>
        <h2 className="text-white font-semibold">
          Dashboard
        </h2>

        <p className="text-sm text-slate-500">
          Your academic workspace
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-slate-400 hover:text-white">
          <Search size={20} />
        </button>

        <button className="text-slate-400 hover:text-white">
          <Bell size={20} />
        </button>

        <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
          U
        </div>

      </div>

    </header>
  );
}