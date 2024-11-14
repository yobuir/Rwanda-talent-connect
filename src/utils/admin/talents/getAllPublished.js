import axiosInstance from "@/lib/axios";

// Fetch published talents
export async function fetchPublishedTalents(page = 1, pageSize = 10) {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/talents`, {
      params: { page, pageSize }
    });
    console.log(response.data.data);
    return {
        talents: response.data.data,
        total: response.data.total
    };
  } catch (error) {
    // console.error("Error fetching published talents:", error);
    return { talents: [], total: 0, error: error.response?.data || error.message };
  }
}
