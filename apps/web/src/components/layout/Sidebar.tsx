import { NavLink } from "react-router-dom";
import { GraduationCap, Settings, X } from "lucide-react";

import { navItems } from "../../config/navigation";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 p-5 transition-transform duration-200 lg:sticky lg:inset-y-auto lg:top-0 lg:z-auto lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >

        <div className="mb-12 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-indigo-500 p-2">
              <GraduationCap size={24} className="text-white" />
            </div>

            <h1 className="text-xl font-bold text-white">UniFlow</h1>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-2">

          <p className="mb-4 text-xs uppercase text-slate-500">Workspace</p>

          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-indigo-500/15 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}

        </nav>

        <button
          type="button"
          className="flex items-center gap-3 p-3 text-slate-400 transition hover:text-white"
        >
          <Settings size={19} />
          Settings
        </button>

      </aside>
    </>
  );
}
