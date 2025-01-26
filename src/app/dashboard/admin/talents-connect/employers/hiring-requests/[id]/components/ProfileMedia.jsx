
import { Image, Video } from 'lucide-react';
import React from 'react';

function ProfileMedia() {
  return (
    <div className='flex flex-col gap-3 py-6'>
      <div className='flex flex-col gap-4'>
        <h1 className=' font-semibold flex items-center gap-2'> <Image size={20}/> Images </h1>
      </div>
      <div className='flex flex-col gap-4'>
        <h1 className=' font-semibold flex items-center gap-2'> <Video  size={20}/> Videos </h1>
          <div className='flex lg:flex-row flex-wrap gap-3 '>
          
          </div>
      </div>
    </div>
 
  );
}

export default ProfileMedia;
