import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useLockBodyScroll(mobileNavOpen);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");

    const handleChange = () => {
      if (desktop.matches) setMobileNavOpen(false);
    };

    desktop.addEventListener("change", handleChange);

    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-indigo-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="min-w-0 flex-1">

        <Header
          menuOpen={mobileNavOpen}
          onMenuClick={() => setMobileNavOpen(true)}
        />

        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-7xl p-5 focus:outline-none sm:p-8"
        >
          <Outlet />
        </main>

      </div>

    </div>
  );
}
