import axiosInstance from '@/lib/axios';
export const UpdateUSer = async (updateData) => {
  try { 
    const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/users/update-profile`, updateData); 
    return response.data;
  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
}