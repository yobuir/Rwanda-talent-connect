import axiosInstance from "@/lib/axios";

// Fetch published talents
export async function fetchAllEmployers(page = 1, pageSize = 10) {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/users/all`, {
      params: { page, pageSize }
    });
    console.log(response.data.data);
    return {
        talents: response.data.data, 
    };
  } catch (error) {
    // console.error("Error fetching published talents:", error);
    return { talents: [], error: error.response?.data || error.message };
  }
}
