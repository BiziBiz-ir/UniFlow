import { differenceInCalendarDays, format, parseISO } from "date-fns";

function toDate(value: string): Date | null {
  const date = parseISO(value);

  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDeadline(deadline: string): string {
  const date = toDate(deadline);

  if (!date) return deadline;

  const days = differenceInCalendarDays(date, new Date());

  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  if (days === -1) return "Yesterday";

  return format(date, "MMM d");
}

export function isOverdue(deadline: string): boolean {
  const date = toDate(deadline);

  return date ? differenceInCalendarDays(date, new Date()) < 0 : false;
}
