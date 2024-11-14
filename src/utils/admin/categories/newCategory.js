import axiosInstance from "@/lib/axios";
// Fetch published talents
export async function newCategories(data) {
    try {
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/categories`,data);
        return response.data; 
    } catch (error) { 
        return error.response?.data || error.message;
    }
}