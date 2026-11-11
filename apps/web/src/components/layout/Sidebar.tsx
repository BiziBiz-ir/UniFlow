import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { GraduationCap, Settings, X } from "lucide-react";

import { navItems } from "../../config/navigation";
import { useFocusTrap } from "../../hooks/useFocusTrap";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

interface SidebarContentProps {
  onNavigate: () => void;
  onClose?: () => void;
}

function SidebarContent({ onNavigate, onClose }: SidebarContentProps) {
  return (
    <>
      <div className="mb-12 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-indigo-500 p-2">
            <GraduationCap size={24} className="text-white" />
          </div>

          <h1 className="text-xl font-bold text-white">UniFlow</h1>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav aria-label="Workspace" className="flex-1 space-y-2">

        <p className="mb-4 text-xs uppercase text-slate-400">Workspace</p>

        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
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
    </>
  );
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const drawerRef = useRef<HTMLElement>(null);

  useFocusTrap(drawerRef, mobileOpen, onClose);

  return (
    <>
      <aside
        aria-label="Main navigation"
        className="hidden w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 p-5 lg:sticky lg:top-0 lg:flex lg:h-screen"
      >
        <SidebarContent onNavigate={onClose} />
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          />

          <aside
            id="app-mobile-nav"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="relative flex h-full w-64 max-w-[80vw] flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 p-5"
          >
            <SidebarContent onNavigate={onClose} onClose={onClose} />
          </aside>

        </div>
      )}
    </>
  );
}
