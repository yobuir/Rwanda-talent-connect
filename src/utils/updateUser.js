import axiosInstance from '@/lib/axios';
export const UpdateUSer = async (id,name,phone,email,role,gender,headline,bio,age,height,weight) => {
  try { 
    const response = await axiosInstance.put(`users/update/${id}`, { fullName:name,phoneNumber:phone,email,role: role,gender: gender,headline: headline,bio: bio });
    const { user } = response.data; 
    return { success: true, user };
  } catch (error) { 
    return { success: false, error:error.response.data || error.message };
  }
}