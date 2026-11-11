import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  Clock,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  description: string;
  icon: LucideIcon;
  end?: boolean;
}

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Dashboard",
    description: "Your academic workspace",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/calendar",
    label: "Calendar",
    description: "Task deadlines at a glance",
    icon: CalendarDays,
  },
  {
    to: "/tasks",
    label: "Tasks",
    description: "Manage everything on your plate",
    icon: CheckSquare,
  },
  {
    to: "/subjects",
    label: "Subjects",
    description: "Progress by course",
    icon: BookOpen,
  },
  {
    to: "/schedule",
    label: "Schedule",
    description: "Your daily timetable",
    icon: Clock,
  },
];

export function getNavItem(pathname: string): NavItem {
  return (
    navItems.find((item) =>
      item.end
        ? pathname === item.to
        : pathname === item.to || pathname.startsWith(`${item.to}/`),
    ) ?? navItems[0]
  );
}
