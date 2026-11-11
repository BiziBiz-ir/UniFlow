import { Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";
import Calendar from "./pages/Calendar";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Schedule from "./pages/Schedule";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
