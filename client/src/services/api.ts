import axios from 'axios';
import { TaskResponse } from '../types/Task';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskApi = {
  getAllTasks: async (): Promise<TaskResponse> => {
    const response = await api.get('/tasks');
    return response.data;
  },
};

export default api;