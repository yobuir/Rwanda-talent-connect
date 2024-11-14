import axios from 'axios';
import { parseCookies, destroyCookie } from 'nookies';
import { redirect } from 'next/navigation'; 
import { getSession } from 'next-auth/react'; 

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL, 
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();

    if (session && session.token) {
      config.headers.Authorization = `Bearer ${session.token}`;
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
