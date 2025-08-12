import { Task } from '../types/Task';
import TaskCard from './TaskCard';

const TaskList = ({ 
  tasks, 
  loading, 
  error, 
  onToggleComplete 
}: { 
  tasks: Task[]; 
  loading: boolean; 
  error: string | null;
  onToggleComplete: (id: string, completed: boolean) => void;
}) => {
  if (loading) {
    return <div className="flex justify-center items-center py-12 text-gray-500 text-lg">Loading tasks...</div>;
  }

  if (error) {
    return <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-12 text-gray-500 text-lg">No tasks found. Create your first task!</div>;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TaskList;