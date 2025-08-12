import { FilterType } from '../hooks/useTaskFilter';

type TaskFilterProps = {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    incomplete: number;
  };
};

const TaskFilter = ({ filter, onFilterChange, taskCounts }: TaskFilterProps) => {
  const filters = [
    { key: 'all' as FilterType, label: 'All', count: taskCounts.all },
    { key: 'incomplete' as FilterType, label: 'Incomplete', count: taskCounts.incomplete },
    { key: 'completed' as FilterType, label: 'Completed', count: taskCounts.completed },
  ];

  const getButtonStyle = (filterKey: FilterType) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors";
    const activeStyle = "bg-blue-500 text-white";
    const inactiveStyle = "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300";
    
    return `${baseStyle} ${filter === filterKey ? activeStyle : inactiveStyle}`;
  };

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={getButtonStyle(key)}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;