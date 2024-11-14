import axiosInstance from '@/lib/axios';
export const updateCompany = async (CompanyData,CompanyId) => {
try { 
    const response = await axiosInstance.put(`${process.env.NEXT_PUBLIC_API_URL}/company/${CompanyId}`,CompanyData);

        return { success: true, data:response.data };
    } catch (error) { 
        return { success: false, error:error.response.data || error.message };
    }
}