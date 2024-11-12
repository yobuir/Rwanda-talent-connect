
import axios from 'axios';
import { parseCookies, setCookie, destroyCookie } from 'nookies';
 
const axiosInstance = axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
 
axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
 
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
 
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
 
      destroyCookie(null, 'token');
      window.location.href = '/auth/login';  
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
