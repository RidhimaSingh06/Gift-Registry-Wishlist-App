import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if backend runs on a different port
});

// Request interceptor to add the auth token to headers
api.interceptors.request.use(
  (config) => {
    const user = localStorage.getItem('registry_user');
    if (user) {
      const parsedUser = JSON.parse(user);
      config.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
