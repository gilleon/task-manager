import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = process.env.REACT_APP_API_URL || 
  process.env.NODE_ENV === 'production' 
    ? 'https://task-manager-31mp.vercel.app'
    : 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

const STORAGE_KEY = 'task-manager-tasks';

const localStorageUtils = {
  getTasks: (): Task[] => {
    try {
      const tasks = localStorage.getItem(STORAGE_KEY);
      return tasks ? JSON.parse(tasks) : [];
    } catch {
      return [];
    }
  },

  saveTasks: (tasks: Task[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  },

  generateId: (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
};

const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const isBackendReachable = async (): Promise<boolean> => {
  try {
    await api.get('/health', { timeout: 2000 });
    return true;
  } catch {
    return false;
  }
};

// localStorage API implementation (fallback)
const localStorageApi = {
  getAllTasks: async () => {
    const tasks = localStorageUtils.getTasks();
    return {
      success: true,
      data: tasks,
      count: tasks.length
    };
  },

  createTask: async (taskData: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    const tasks = localStorageUtils.getTasks();
    const newTask: Task = {
      ...taskData,
      _id: localStorageUtils.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const updatedTasks = [newTask, ...tasks];
    localStorageUtils.saveTasks(updatedTasks);
    
    return {
      success: true,
      data: newTask
    };
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    const tasks = localStorageUtils.getTasks();
    const taskIndex = tasks.findIndex(task => task._id === id);
    
    if (taskIndex === -1) {
      return { success: false, message: 'Task not found' };
    }
    
    const updatedTask = {
      ...tasks[taskIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    
    tasks[taskIndex] = updatedTask;
    localStorageUtils.saveTasks(tasks);
    
    return {
      success: true,
      data: updatedTask
    };
  },

  deleteTask: async (id: string) => {
    const tasks = localStorageUtils.getTasks();
    const filteredTasks = tasks.filter(task => task._id !== id);
    
    if (tasks.length === filteredTasks.length) {
      return { success: false, message: 'Task not found' };
    }
    
    localStorageUtils.saveTasks(filteredTasks);
    return { success: true };
  },
};

// Backend API implementation with smart fallback
const backendApi = {
  getAllTasks: async () => {
    try {
      const response = await api.get('/tasks');
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, falling back to localStorage');
      return localStorageApi.getAllTasks();
    }
  },

  createTask: async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await api.post('/tasks', task);
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, falling back to localStorage');
      return localStorageApi.createTask(task);
    }
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    if (!isValidObjectId(id)) {
      console.warn('Invalid ObjectId, using localStorage for update');
      return localStorageApi.updateTask(id, updates);
    }

    try {
      const response = await api.put(`/tasks/${id}`, updates);
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, falling back to localStorage');
      return localStorageApi.updateTask(id, updates);
    }
  },

  deleteTask: async (id: string) => {
    if (!isValidObjectId(id)) {
      console.warn('Invalid ObjectId, using localStorage for delete');
      return localStorageApi.deleteTask(id);
    }

    try {
      const response = await api.delete(`/tasks/${id}`);
      return response.data;
    } catch (error) {
      console.warn('Backend unreachable, falling back to localStorage');
      return localStorageApi.deleteTask(id);
    }
  },
};

export const taskApi = backendApi;
export const checkBackendStatus = isBackendReachable;

export default api;