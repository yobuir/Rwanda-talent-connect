import CustomAvatar from '@/app/components/CustomAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

function CompanyProfile() {
  return (
        <div className='flex flex-row gap-2 items-center justify-between border-b pb-3 w-full'>
            <div className='flex flex-row gap-2 items-center'>
                <div className='relative flex h-20 w-20 shrink-0 overflow-hidden'>
                    <CustomAvatar styles='h-full w-full ' />
                </div>
                <div className='flex flex-col'>
                    <h5>Clothing Company </h5> 
                        <span className='flex text-gray-500 items-center text-sm gap-1'>
                            <MapPin size={16}/>   Kigali, Rwanda
                        </span> 
                    <span className='text-xs text-orange-500'>Registered. 4 days ago</span>
                </div>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <Badge>
                Verified
                </Badge>
                <Button variant="outline" size="sm" asChild>
                <Link href="/organizations/1" className="flex  leading-none">
                    View organization
                </Link> 
                </Button>
            </div>
        </div>
  );
}

export default CompanyProfile;
