import axiosInstance from "@/lib/axios";

export async function fetchTalentRequestBId(id) {
    console.log(id);
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/get/requested-talents/${id}`) 
    return {
        talents: response.data.data, 
    };
  } catch (error) {
    console.error("Error fetching published talents:", error);
    return { talents: null, error: error.response?.data || error.message };
  }
}