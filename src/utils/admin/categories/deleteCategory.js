import axiosInstance from "@/lib/axios";

export async function deleteCategory(id) {
  try {
    const response = await axiosInstance.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}`);
    return response.data;
  } catch (error) {
    return error.response?.data || error.message;
  }
}
