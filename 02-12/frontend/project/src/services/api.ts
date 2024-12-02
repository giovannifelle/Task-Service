import axios from 'axios';
import { Task } from '../types/Task';
import { toast } from 'react-hot-toast';
import { logger } from './logger';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const getErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Unable to connect to the server. Please ensure the backend is running on port 8080.';
    }
    return error.response.status === 404
      ? 'API endpoint not found'
      : error.response.data?.message || 'An error occurred while processing your request';
  }
  return 'An unexpected error occurred';
};

api.interceptors.response.use(
  response => response,
  error => {
    const message = getErrorMessage(error);
    logger.error('API Error:', message);
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  config => {
    logger.info(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  error => Promise.reject(error)
);

export const taskService = {
  getAllTasks: async () => {
    try {
      const response = await api.get<Task[]>('/tasks');
      logger.info('Tasks received:', response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error fetching tasks:', message);
      throw error;
    }
  },
  
  getTaskById: async (id: number) => {
    try {
      const response = await api.get<Task>(`/taskId/${id}`);
      logger.info(`Task ${id} retrieved:`, response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error(`Error fetching task ${id}:`, message);
      throw error;
    }
  },
  
  createTask: async (task: Task) => {
    try {
      const response = await api.post<Task>('/task', task);
      logger.info('Task created:', response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error creating task:', message);
      throw error;
    }
  },
  
  updateTask: async (id: number, title: string, completed: boolean, description: string) => {
    try {
      const response = await api.put(`/tasks/${id}`, null, {
        params: { title, completed, description }
      });
      logger.info(`Task ${id} updated:`, response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error(`Error updating task ${id}:`, message);
      throw error;
    }
  },
  
  deleteTask: async (id: number) => {
    try {
      const response = await api.delete(`/task/${id}`);
      logger.info(`Task ${id} deleted`);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error(`Error deleting task ${id}:`, message);
      throw error;
    }
  },
  
  getTasksByTitle: async (title: string) => {
    try {
      const response = await api.get<Task[]>(`/taskTitle/${title}`);
      logger.info(`Tasks with title "${title}" retrieved:`, response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error(`Error fetching tasks with title ${title}:`, message);
      throw error;
    }
  },
  
  getCompletedTasks: async (completed: boolean) => {
    try {
      const response = await api.get<Task[]>('/taskCompleted', {
        params: { param: completed }
      });
      logger.info(`Completed tasks retrieved:`, response.data);
      return response;
    } catch (error) {
      const message = getErrorMessage(error);
      logger.error('Error fetching completed tasks:', message);
      throw error;
    }
  }
};