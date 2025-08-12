import { Task } from '../types/Task';
import TaskCard from './TaskCard';

type TaskListProps = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
};

const TaskList = ({ tasks, loading, error, onToggleComplete, onDeleteTask }: TaskListProps) => {
  const centerClass = "flex justify-center items-center py-12 text-lg";
  
  const renderState = (content: string, className: string = "") => (
    <div className={`${centerClass} ${className}`}>{content}</div>
  );

  if (loading) return renderState("Loading tasks...", "text-gray-500");
  
  if (error) return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
      {error}
    </div>
  );
  
  if (tasks.length === 0) return renderState("No tasks found. Create your first task!", "text-gray-500");

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard 
          key={task._id} 
          task={task} 
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
};

export default TaskList;