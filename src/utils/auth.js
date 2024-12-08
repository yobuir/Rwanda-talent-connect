import axiosInstance from '@/lib/axios';
import useAuthStore from '../store/authStore';
import Cookies from 'js-cookie';
export const Register = async (name,phone,email, password) => {
  try { 
    const response = await axiosInstance.post(`auth/register`, { fullName:name,phoneNumber:phone,email, password,role: "talent" });
     
    const { user } = response.data; 
    
    return { success: true, user };
  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
}

export const Login = async (email, password) => {
  try {
    const response = await axiosInstance.post(`auth/login`, { email, password });
    const { user, token } = response.data;
    // Update Zustand store
    useAuthStore.getState().login(user, token);
     Cookies.set('auth_token', token, { secure: true, sameSite: 'Strict', expires: 7 }); 
    Cookies.set('user_data', JSON.stringify(user), { secure: true, sameSite: 'Strict', expires: 7 });
    return { success: true, user, token };

  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
};


export const logout = () => {
  useAuthStore.getState().logout();
};

export const getCurrentUser = () => {
  return useAuthStore.getState().user;
};
