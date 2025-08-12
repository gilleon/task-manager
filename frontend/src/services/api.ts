import axios from 'axios';
import { Task } from '../types/Task';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  createTask: async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>) => {
    const response = await api.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id: string, updates: Partial<Task>) => {
    const response = await api.put(`/tasks/${id}`, updates);
    return response.data;
  },

  deleteTask: async (id: string) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default api;