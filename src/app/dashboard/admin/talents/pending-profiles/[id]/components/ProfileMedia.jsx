import ZoomableImage from '@/app/components/zoomableImage';
import { Image, Video } from 'lucide-react';
import React from 'react';

function ProfileMedia() {
  return (
    <div className='flex flex-col gap-3 py-6'>
      <div className='flex flex-col gap-4'>
        <h1 className=' font-semibold flex items-center gap-2'> <Image size={20}/> Images </h1>
          <div className='flex lg:flex-row flex-wrap gap-3 '>
            <div>
              <ZoomableImage src="https://www.nico.fyi/_next/image?url=%2Fstatic%2Fimages%2Farticles%2Fgohan-miso-kare-udon2.jpeg&w=1920&q=75" alt="Profile Image" className="w-40 h-40 rounded-md" />
            </div>
            <div>
              <ZoomableImage src="https://images.unsplash.com/photo-1532751203793-812308a10d8e?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile Image" className="w-40 h-40 rounded-md" />
            </div> 
          </div>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className=' font-semibold flex items-center gap-2'> <Video  size={20}/> Videos </h1>
          <div className='flex lg:flex-row flex-wrap gap-3 '>
            <div>
              <ZoomableImage src="https://www.nico.fyi/_next/image?url=%2Fstatic%2Fimages%2Farticles%2Fgohan-miso-kare-udon2.jpeg&w=1920&q=75" alt="Profile Image" className="w-40 h-40 rounded-md" />
            </div>
            <div>
              <ZoomableImage src="https://images.unsplash.com/photo-1532751203793-812308a10d8e?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Profile Image" className="w-40 h-40 rounded-md" />
            </div> 
          </div>
      </div>
    </div>
 
  );
}

export default ProfileMedia;
