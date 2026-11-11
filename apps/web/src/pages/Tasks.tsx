import PageHeader from "../components/layout/PageHeader";
import TasksPanel from "../components/tasks/TasksPanel";
import { useTasks } from "../hooks/useTasks";

export default function Tasks() {
  const { tasks, addTask, updateTask, deleteTask, toggleTaskStatus } =
    useTasks();

  return (
    <div>
      <PageHeader
        title="Tasks"
        description="Add, edit, complete and remove tasks. Changes are saved automatically."
      />

      <TasksPanel
        title="Task list"
        tasks={tasks}
        onAdd={addTask}
        onUpdate={updateTask}
        onDelete={deleteTask}
        onToggleStatus={toggleTaskStatus}
      />
    </div>
  );
}
