
import axiosInstance from "@/lib/axios"; 
export async function fetchUserMedia({userId}) {
  console.log(userId)
  try {  
    const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/media/${userId}`);
    const media = response.data; 
    console.log(media)
    return media;
  } catch (error) { 
    console.log(error) 
    return error.response?.data || error.message;
  }
}

// Delete media
export const deleteMedia = async (mediaId) => {
  try {
    const response = await axios.delete(`/api/media/${mediaId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete media:', error);
    throw error;
  }
};