import { useTasks } from './hooks/useTasks';
import { useTaskFilter } from './hooks/useTaskFilter';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import TaskFilter from './components/TaskFilter';
import StatusBadge from './components/StatusBadge';

const App = () => {
  const { 
    tasks, 
    loading, 
    error, 
    addTask, 
    toggleComplete, 
    deleteTask 
  } = useTasks();

  const {
    filter,
    setFilter,
    filteredTasks,
    taskCounts,
  } = useTaskFilter(tasks);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Task Manager
          </h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Tasks
        </h2>
        
        <AddTaskForm onAddTask={addTask} />
        
        <TaskFilter 
          filter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />
        
        <TaskList 
          tasks={filteredTasks} 
          loading={loading} 
          error={error} 
          onToggleComplete={toggleComplete}
          onDeleteTask={deleteTask}
        />
      </main>
      
      <StatusBadge />
    </div>
  );
};

export default App;
