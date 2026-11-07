export type TaskStatus = "pending" | "completed" | "in-progress";

export type Priority = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  subject: string;
  deadline: string;
  priority: Priority;
  status: TaskStatus;
}

export interface ScheduleEvent {
  id: number;
  title: string;
  type: "class" | "study" | "work";
  startTime: string;
  endTime: string;
}
