import type { Task, ScheduleEvent } from "../types";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Complete Divide and Conquer exercises",
    subject: "Data Structures",
    deadline: "2026-11-09",
    priority: "high",
    status: "pending",
  },
  {
    id: 2,
    title: "Review Chapter 2",
    subject: "Computer Architecture",
    deadline: "2026-11-10",
    priority: "medium",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Solve differential equations",
    subject: "Mathematics 2",
    deadline: "2026-11-11",
    priority: "high",
    status: "pending",
  },
  {
    id: 4,
    title: "Review probability exercises",
    subject: "Probability",
    deadline: "2026-11-12",
    priority: "low",
    status: "pending",
  },
];

export const schedule: ScheduleEvent[] = [
  {
    id: 1,
    title: "University Classes",
    type: "class",
    startTime: "08:00",
    endTime: "12:00",
  },
  {
    id: 2,
    title: "Data Structures Practice",
    type: "study",
    startTime: "13:00",
    endTime: "14:30",
  },
  {
    id: 3,
    title: "Mathematics 2",
    type: "study",
    startTime: "15:00",
    endTime: "16:30",
  },
  {
    id: 4,
    title: "Personal Project",
    type: "work",
    startTime: "17:00",
    endTime: "18:00",
  },
];