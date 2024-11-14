import axiosInstance from "@/lib/axios";
// Fetch published talents
export async function getCategories() {
    try {
        const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        return response.data; 
    } catch (error) { 
        return error.response?.data || error.message;
    }
}