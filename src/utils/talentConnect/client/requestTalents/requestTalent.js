import axiosInstance from '@/lib/axios';

export const RequestTalent = async (data) => {
    try { 
        const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/request-talent`,data);
        return { success: true, data: response.data };
    } catch (error) { 
        return { success: false, error: error.response.data || error.message };
    }
}