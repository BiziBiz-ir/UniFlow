import type { ScheduleEvent, Task } from "../types";

function minutesBetween(start: string, end: string): number {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  return endHour * 60 + endMinute - (startHour * 60 + startMinute);
}

export function countPendingTasks(tasks: Task[]): number {
  return tasks.filter((task) => task.status === "pending").length;
}

export function countClasses(events: ScheduleEvent[]): number {
  return events.filter((event) => event.type === "class").length;
}

export function formatStudyTime(events: ScheduleEvent[]): string {
  const minutes = events
    .filter((event) => event.type === "study")
    .reduce(
      (total, event) => total + minutesBetween(event.startTime, event.endTime),
      0,
    );

  const hours = Math.round((minutes / 60) * 10) / 10;

  return `${hours}h`;
}
