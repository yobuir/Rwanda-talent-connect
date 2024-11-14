import axiosInstanceForm from "@/lib/axiosForm";
export async function addMediaProfile(formData) {
  console.log(formData)
  try {  
    const response = await axiosInstanceForm.post(`${process.env.NEXT_PUBLIC_API_URL}/upload-media`,formData, {
         headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 100000,
        
    });

    const media = response.data; 
    return media;
  } catch (error) { 
    console.log(error) 
    return error.response?.data || error.message;
  }
}