import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 lg:flex">

      <Sidebar
        mobileOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="min-w-0 flex-1">

        <Header onMenuClick={() => setMobileNavOpen(true)} />

        <main className="mx-auto max-w-7xl p-5 sm:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
