import axiosInstance from "@/lib/axios"
export async function getAllCompanies(page = 1, pageSize = 10) {
  try {  
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/companies`,{ params: { page, pageSize }});
 
    const companies =response.data.data; 
    return companies;
  } catch (error) { 
    return error.response?.data || error.message;
  }
}