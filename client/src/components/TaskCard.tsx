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

const TaskCard = ({ task }: { task: Task }) => {
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();

  return (
    <div className={`
      bg-white rounded-lg p-6 shadow-md border-l-4 hover:shadow-lg transition-shadow duration-200
      ${task.completed ? `${borderColors.completed} opacity-70` : borderColors[task.priority]}
    `}>
      <div className={`text-xl font-semibold text-gray-900 mb-2 ${task.completed ? 'line-through' : ''}`}>
        {task.title}
      </div>
      
      <div className="text-gray-600 mb-4 leading-relaxed">
        {task.description || 'No description'}
      </div>
      
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded text-xs font-bold uppercase ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          
          <span className={`px-3 py-1 rounded text-xs font-bold ${
            task.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
          }`}>
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