import axios from "axios";
import axiosInstance from "../../lib/axios";

export async function getLoggedUser(token) {
  try {
    // Set Authorization header with the token
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/current-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = response?.data?.data; 
    const isVerified = user.status === "pending"?false:true;
    const hasRole = Boolean(user.role);

    return { user, isVerified, hasRole, error: null };
  } catch (error) {
    console.error("Error fetching user data:", error.response?.data || error.message);
    return { user: null, isVerified: false, hasRole: false, error: error.message };
  }
}
