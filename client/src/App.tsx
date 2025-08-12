import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import { Task } from './types/Task';
import { taskApi } from './services/api';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        <TaskList tasks={tasks} loading={loading} error={error} />
      </main>
    </div>
  );
};

export default App;
