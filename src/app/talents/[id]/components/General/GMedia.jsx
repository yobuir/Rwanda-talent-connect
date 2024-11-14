import { CustomDialog } from '@/app/components/CustomDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CirclePlus, CloudUpload, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react'; 
import { Card, CardContent } from '@/components/ui/card';  

import { Image } from 'antd';  
import { CheckCircle2 } from 'lucide-react'; 
import FileUploadDragDrop from '@/app/components/fileUploads/FileUploadDragDrop';
import { addMediaProfile } from '@/utils/media/uploadProfileMedia'; 
import { toast } from '@/hooks/use-toast';
import MediaGallery from './Media/MediaGallery';


function GMedia() {
  
   const [selectedFiles, setSelectedFiles] = useState([]);
   const [mediaType, setMediaType] = useState('');
   const [category, setCategory] = useState('profile');
   const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    // Validate inputs with detailed logging
    if (!mediaType) {
      toast.error('Please select a media type');
      console.error('No media type selected');
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Please select files to upload');
      console.error('No files selected');
      return;
    }

    // Create FormData for file upload with explicit logging
    const formData = new FormData();
    formData.append('mediaType', mediaType);
    formData.append('category', category);
    
    selectedFiles.forEach((file, index) => { 
      formData.append('files', file);
    });
    try {
      setIsUploading(true); 
      const response = await addMediaProfile(formData);
     
      if (response.status === 'success') { 
        toast({
          variant: "default",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });  
        setSelectedFiles([]);
        setMediaType(''); 
      } else { 
        toast({
          variant: "destructive",
          title: "Profile Update Failed",
          description: "An error occurred while updating your profile. Please try again.",
        });
      } 
    } catch (error) { 
      console.error('Upload Error:', error);
      toast({
        variant: "destructive",
        title: "Profile Update Failed",
        description: error.response?.data?.message || 'An error occurred',
      });
    } finally {
      setIsUploading(false);
    }
  };
  const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center"> <CirclePlus  /></span>
          </Button>)
    const content = (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label>Media Type</Label>
          <div className="flex flex-wrap gap-4">
            <Label className="flex flex-1 items-center space-x-2">
              <Input 
                type="radio" 
                name="mediaType" 
                value="image" 
                checked={mediaType === 'image'}
                onChange={(e) => setMediaType(e.target.value)}
                className="sr-only"
              />
              <span 
                className={`
                  p-2 border rounded cursor-pointer  py-6 px-3 text-center  w-full
                  ${mediaType === 'image' 
                    ? 'border-orange-500 w-full  text-orange-500' 
                    : 'border-gray-300'}
                `}
              >
                Images
              </span>
            </Label>
            
            <Label className="flex flex-1 items-center space-x-2">
              <Input 
                type="radio" 
                name="mediaType" 
                value="video" 
                checked={mediaType === 'video'}
                onChange={(e) => setMediaType(e.target.value)}
                className="sr-only"
              />
              <span 
                className={`
                  p-2 border rounded  py-6 px-3 text-center  w-full cursor-pointer
                  ${mediaType === 'video' 
                    ? 'border-orange-500 text-orange-500' 
                    : 'border-gray-300'}
                `}
              >
                Video
              </span>
            </Label>
          </div>
        </div>

        <div>
          <Label htmlFor="file-upload">Upload Files</Label>
            <FileUploadDragDrop 
            mediaType={mediaType}
            onFileChange={setSelectedFiles}
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Files:</Label>
            <ul className="space-y-1 text-sm text-gray-600">
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  {file.name} ({(file.size / 1024).toFixed(2)} KB)
                </li>
              ))}
            </ul>
          </div>
        )}

        <Button 
          onClick={handleUpload} 
          disabled={isUploading || !mediaType || selectedFiles.length === 0}
          className="w-full"
        >
          {isUploading ? 'Uploading...' : 'Upload Media'}
          <CloudUpload className="ml-2 w-4 h-4" />
        </Button>
    </div>
    )
  return ( 
    <> 
   <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
                <h1 className='font-semibold text-lg flex items-center gap-2'><CloudUpload/> Upload media    </h1>
                <CustomDialog trigger={trigger} content={content} title="🖼️ Upload media images & videos " description="  " />
            </div>
            <div className='flex gap-2 justify-between mb-4 items-center text-gray-500'>
                <h3 className=''> Upload media images & videos to showcase your work and skills. </h3> 
            </div> 
            {/* <div className='flex gap-2 justify-between flex-wrap items-center'> 
                <Image.PreviewGroup
                preview={{
                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
            >
                <div className='relative'>
                    <div className='absolute flex justify-center items-center bottom-0 z-50 right-0'>
                    <Button variant="outline" className="text-red-500 bottom-0 z-50 right-[50%] left-[50%]"><Trash2 /></Button>
                    </div>
                    <Image width={200} alt='Image' src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                </div> 
            </Image.PreviewGroup>
            </div> */}
            <MediaGallery/>
        </CardContent>
    </Card> 
    </>
)
}

export default GMedia;
