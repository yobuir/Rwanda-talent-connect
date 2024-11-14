import axiosInstance from '@/lib/axios';
export const NewCompany = async (CompanyData) => {
try { 
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/company`,CompanyData);

        return { success: true, data:response.data };
    } catch (error) { 
        return { success: false, error:error.response.data || error.message };
    }
}