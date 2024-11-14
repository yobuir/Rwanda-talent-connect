import axiosInstance from '@/lib/axios';
export const deleteCompany = async (CompanyId) => {
try { 
    const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/company/${CompanyId}`);

        return { success: true, data:response.data };
    } catch (error) { 
        return { success: false, error:error.response.data || error.message };
    }
}