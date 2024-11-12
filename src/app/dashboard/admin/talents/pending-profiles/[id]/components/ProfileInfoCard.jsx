import CustomAvatar from '@/app/components/CustomAvatar';
import { Badge } from '@/components/ui/badge';
import React from 'react';

function ProfileInfoCard({ user }) {
  return (
    <div className='flex flex-row flex-wrap gap-4 justify-between'>
      <div className='flex flex-col gap-2'>
        <div> <p className=""><strong>Name:</strong> {user.name}</p></div>
        <div> <p><strong>Email:</strong> {user.email}</p></div>
        <div>  <p><strong>Role:</strong> {user.role}</p></div>
        <div><Badge variant="secondary">Pending</Badge></div> 
      </div>
      <div className='flex flex-col gap-2'>
        <CustomAvatar styles="h-36 w-36 rounded-lg" /> 
      </div> 
    </div>
  );
}

export default ProfileInfoCard;
