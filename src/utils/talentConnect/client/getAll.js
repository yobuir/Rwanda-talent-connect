import axiosInstance from "@/lib/axios"
export async function getAllCompaniesByOwner(ownerId) {
  
  try { 
    if (!ownerId) {
      return null; 
    }
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/companies/owner/${ownerId}`);
    const companies = response?.data?.data; 
    return companies;
  } catch (error) { 
    return error.response?.data || error.message;
  }
}