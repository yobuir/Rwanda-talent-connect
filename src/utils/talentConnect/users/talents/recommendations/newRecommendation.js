import axiosInstance from '@/lib/axios';
export const newRecommendation = async (data) => {
try { 
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/talents/${data?.talentId}/rate`,data);
        return { success: true, data:response.data };
    } catch (error) { 
        return { success: false, error:error.response.data || error.message };
    }
}