import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import { Task } from './types/Task';
import { taskApi } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await taskApi.getAllTasks();
      
      if (response.success) {
        setTasks(response.data);
      } else {
        setError('Failed to load tasks');
      }
    } catch (err) {
      console.error('Error loading tasks:', err);
      setError('Unable to connect to server. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (newTask: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await taskApi.createTask(newTask);
      if (response.success) {
        setTasks(prevTasks => [response.data, ...prevTasks]);
      } else {
        setError('Failed to create task');
      }
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Unable to create task');
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      const response = await taskApi.updateTask(id, { completed });
      if (response.success) {
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task._id === id ? { ...task, completed } : task
          )
        );
      } else {
        setError('Failed to update task');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Unable to update task');
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 text-center">Task Manager</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
        
        <AddTaskForm onAddTask={handleAddTask} />
        
        <TaskList tasks={tasks} loading={loading} error={error} onToggleComplete={handleToggleComplete}/>
      </main>
    </div>
  );
};

export default App;
