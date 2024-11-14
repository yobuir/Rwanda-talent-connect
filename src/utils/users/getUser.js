import axiosInstance from "../../lib/axios";

export async function getUser() {
  try {
    // Set Authorization header with the token
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/current-user`);

    const user = response?.data?.data;  

    return user;
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
}
