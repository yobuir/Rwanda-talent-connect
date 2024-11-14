import axiosInstance from "@/lib/axios";

 
// Fetch published talents
export async function fetchPublishedTalents() {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/talents`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching published talents:", error);
    throw error.response?.data || error;
  }
}

// Fetch filtered talents
export async function fetchFilteredTalents(filters) {
  try {
    const response = await axiosInstance.get("/filtered-talents", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching filtered talents:", error);
    throw error.response?.data || error;
  }
}

// Fetch compared talents
export async function fetchComparedTalents(sortBy, order) {
  try {
    const response = await axiosInstance.get("/compare-talents", {
      params: { sortBy, order },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching compared talents:", error);
    throw error.response?.data || error;
  }
}
