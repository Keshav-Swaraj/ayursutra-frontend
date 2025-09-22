import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Use an interceptor to add the authorization header to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;