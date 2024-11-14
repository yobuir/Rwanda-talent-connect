import axiosInstance from "@/lib/axios"
export async function getCompany(companyId) {
  
  try { 
    if (!companyId) {
      return null; 
    }
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/company/${companyId}`);

    const company = response?.data?.data;  
    return company;
  } catch (error) {
    console.error("Error fetching company data:", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
}