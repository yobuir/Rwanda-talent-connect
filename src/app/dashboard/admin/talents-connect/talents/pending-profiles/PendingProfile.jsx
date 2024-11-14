import CustomAvatar from '@/app/components/talentConnect/CustomAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const PendingProfile = () => {
  return (
      <div className='flex flex-row gap-2 items-center justify-between border-b pb-3 '>
            <div className='flex flex-row gap-2 items-center'>
            <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <CustomAvatar/>
            </div>
            <div className='flex flex-col'>
                <h5>Yobu Iradukunda </h5>
                <span className='text-xs text-orange-500'>Requested. 4 days ago</span>
            </div>
            </div>
            <div className='flex flex-row gap-2 items-center'>
              <Badge>
                Pending
              </Badge>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/admin/talents/pending-profiles/1" className="flex  leading-none">
              Review req.
              </Link> 
            </Button>
            </div>
        </div>
  );
}

export default PendingProfile;
