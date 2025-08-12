import { Task } from '../types/Task';

const priorityColors = {
  high: 'bg-red-500 text-white',
  medium: 'bg-yellow-500 text-white',
  low: 'bg-gray-500 text-white',
};

const borderColors = {
  high: 'border-l-red-500',
  medium: 'border-l-yellow-500', 
  low: 'border-l-gray-500',
  completed: 'border-l-green-500',
};

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onDeleteTask 
}: { 
  task: Task; 
  onToggleComplete: (id: string, completed: boolean) => void;
  onDeleteTask: (id: string) => void;
}) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  const buttonClass = "px-3 py-1 rounded text-sm font-medium transition-colors";
  const badgeClass = "px-3 py-1 rounded text-xs font-bold";
  
  const getToggleButtonStyle = () => 
    task.completed
      ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      : 'bg-green-100 text-green-700 hover:bg-green-200';

  const getStatusBadgeStyle = () =>
    task.completed 
      ? 'bg-green-100 text-green-800' 
      : 'bg-blue-100 text-blue-800';

  const getBorderStyle = () =>
    task.completed 
      ? `${borderColors.completed} opacity-70` 
      : borderColors[task.priority];

  return (
    <div className={`
      bg-white rounded-lg p-6 shadow-md border-l-4 hover:shadow-lg transition-shadow duration-200
      ${getBorderStyle()}
    `}>
      <div className="flex items-start justify-between mb-2">
        <div className={`text-xl font-semibold text-gray-900 flex-1 ${task.completed ? 'line-through' : ''}`}>
          {task.title}
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onToggleComplete(task._id, !task.completed)}
            className={`${buttonClass} ${getToggleButtonStyle()}`}
          >
            {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
          </button>
          <button
            onClick={() => onDeleteTask(task._id)}
            className={`${buttonClass} bg-red-100 text-red-700 hover:bg-red-200`}
          >
            Delete
          </button>
        </div>
      </div>
      
      <div className="text-gray-600 mb-4 leading-relaxed">
        {task.description || 'No description'}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex gap-2">
          <span className={`${badgeClass} uppercase ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          
          <span className={`${badgeClass} ${getStatusBadgeStyle()}`}>
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        
        <div className="text-sm text-gray-500 space-y-1">
          {task.dueDate && <div>Due: {formatDate(task.dueDate)}</div>}
          <div>Created: {formatDate(task.createdAt)}</div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;