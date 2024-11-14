import axiosInstance from '@/lib/axios';
export const updateCompany = async (data) => {
try { 
    const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/company/${data.companyId}`,data);
        return { success: true, data:response.data };
    } catch (error) {  
        return { success: false, error:error.response.data || error.message };
    }
}