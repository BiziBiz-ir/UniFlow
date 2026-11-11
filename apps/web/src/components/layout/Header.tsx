import { Bell, Menu, Search } from "lucide-react";
import { useLocation } from "react-router-dom";

import { getNavItem } from "../../config/navigation";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { pathname } = useLocation();
  const current = getNavItem(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-slate-800 bg-slate-950/95 px-5 backdrop-blur sm:px-8">

      <div className="flex min-w-0 items-center gap-3">

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="min-w-0">
          <h2 className="truncate font-semibold text-white">
            {current.label}
          </h2>

          <p className="truncate text-sm text-slate-500">
            {current.description}
          </p>
        </div>

      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-5">

        <button
          type="button"
          aria-label="Search"
          className="hidden rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white sm:block"
        >
          <Search size={20} />
        </button>

        <button
          type="button"
          aria-label="Notifications"
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-800 hover:text-white"
        >
          <Bell size={20} />
        </button>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500 font-semibold text-white">
          U
        </div>

      </div>

    </header>
  );
}
