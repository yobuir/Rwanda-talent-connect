import axiosInstance from "../../../lib/axios";

export async function getTalentById({id}) {
  try {
    // Set Authorization header with the token
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);

    const user = response?.data 
    return user;
  } catch (error) {
     if(error.response?.data.code ==400){
        window.location.href = '/auth/login';
    }
    return error.response?.data || error.message;
  }
}
