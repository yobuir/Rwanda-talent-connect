import axiosInstance from "@/lib/axios";
// Fetch published talents
export async function getCategoryById(id) {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
        return response.data; 
    } catch (error) {
        console.error("Error fetching published talents:", error);
        throw error.response?.data || error;
    }
}