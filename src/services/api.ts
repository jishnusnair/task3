import axios from 'axios';
import { Task, CreateTaskRequest } from '../types/task';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const taskService = {
  // Get all tasks or single task by ID
  getTasks: (id?: string): Promise<Task | Task[]> => {
    const url = id ? `/tasks?id=${id}` : '/tasks';
    return api.get(url).then(response => response.data);
  },

  // Create or update task
  createTask: (task: CreateTaskRequest): Promise<Task> => {
    return api.put('/tasks', task).then(response => response.data);
  },

  // Delete task
  deleteTask: (id: string): Promise<string> => {
    return api.delete(`/tasks?id=${id}`).then(response => response.data);
  },

  // Search tasks by name
  searchTasks: (name: string): Promise<Task[]> => {
    return api.get(`/tasks/search?name=${name}`).then(response => response.data);
  },

  // Execute task
  executeTask: (id: string): Promise<Task> => {
    return api.put(`/tasks/execute?id=${id}`).then(response => response.data);
  },
};
