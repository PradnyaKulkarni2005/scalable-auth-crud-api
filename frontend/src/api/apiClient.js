import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API calls
export const registerUser = (name, email, password) =>
  api.post('/auth/register', { name, email, password });

export const loginUser = (email, password) =>
  api.post('/auth/login', { email, password });

export const getProfile = () => api.get('/auth/profile');

// Task API calls
export const createTask = (taskData) => api.post('/tasks', taskData);

export const getAllTasks = (filters = {}) =>
  api.get('/tasks', { params: filters });

export const getTaskById = (id) => api.get(`/tasks/${id}`);

export const updateTask = (id, taskData) => api.put(`/tasks/${id}`, taskData);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const healthCheck = () => api.get('/health');

export default api;
