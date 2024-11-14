import axiosInstance from "@/lib/axios";

export async function getCategories(page = 1, limit = 10) {
  try {
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}