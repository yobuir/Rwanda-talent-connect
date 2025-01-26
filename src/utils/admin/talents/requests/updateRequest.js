import axiosInstance from "@/lib/axios";

export async function updateRequestStatus(data) {
    try {
        const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/request-status/${data?.id}`,data); 
    return response.data;
    } catch (error) {
        console.error("Error fetching published talents:", error);
        return { talents: null, error: error.response?.data || error.message };
    }
}