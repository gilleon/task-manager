import { useState, useEffect } from 'react';
import { Task } from '../types/Task';
import { taskApi } from '../services/api';
import { getErrorMessage, logError } from '../utils/errorHandler';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleApiOperation = async (
    operation: () => Promise<any>,
    successCallback: (response: any) => void,
    errorContext: string,
    showLoading = false
  ) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      
      const response = await operation();
      
      if (response.success) {
        successCallback(response);
      } else {
        const errorMsg = `Failed to ${errorContext}`;
        setError(errorMsg);
        logError(errorContext, response);
      }
    } catch (err) {
      const errorMsg = getErrorMessage(err);
      logError(errorContext, err);
      setError(`Unable to ${errorContext}: ${errorMsg}`);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const loadTasks = async () => {
    await handleApiOperation(
      () => taskApi.getAllTasks(),
      (response) => setTasks(response.data),
      'load tasks',
      true
    );
  };

  const addTask = async (newTask: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    await handleApiOperation(
      () => taskApi.createTask(newTask),
      (response) => setTasks(prev => [response.data, ...prev]),
      'create task'
    );
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    await handleApiOperation(
      () => taskApi.updateTask(id, { completed }),
      () => setTasks(prev => 
        prev.map(task => 
          task._id === id ? { ...task, completed } : task
        )
      ),
      'update task'
    );
  };

  const deleteTask = async (id: string) => {
    await handleApiOperation(
      () => taskApi.deleteTask(id),
      () => setTasks(prev => prev.filter(task => task._id !== id)),
      'delete task'
    );
  };

  useEffect(() => {
    loadTasks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleComplete,
    deleteTask,
    refreshTasks: loadTasks
  };
};