import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { redirect } from 'next/navigation'; // Use App Router's `redirect` function

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const cookies = parseCookies();
    const token = cookies.auth_token;

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    } 

    return config;
  },
  (error) => { 
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      destroyCookie(null, 'token');

      // Redirect user to login (works in App Router)
      if (typeof window !== 'undefined') {
        // Client-side redirect
        window.location.href = '/auth/login';
      } else {
        // Server-side redirect
        redirect('/auth/login');
      }
    }  
    return Promise.reject(error);
  }
);

export default axiosInstance;
