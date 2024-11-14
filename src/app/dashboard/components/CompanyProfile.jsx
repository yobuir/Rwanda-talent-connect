import CustomAvatar from '@/app/components/talentConnect/CustomAvatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import React from 'react';

function CompanyProfile({ company }) { 
  return (
        <Link href={`/organizations/${company?._id}`} className='flex flex-row gap-2 items-center justify-between border-b pb-3 w-full'>
            <div className='flex flex-row gap-2 items-center'>
                <div className='relative flex h-20 w-20 shrink-0 overflow-hidden'>
                    <CustomAvatar styles='h-full  w-full ' name={company.companyName} image={company.logo}  />
                </div>
                <div className='flex flex-col'>
                    <h5>{company?.companyName}  <Badge variant={company?.status != 'active' ? 'primary' : ''}>
                {company?.status}
                </Badge>
                </h5> 
                        <span className='flex text-gray-500 items-center text-sm gap-1'>
                            {company?.address? <MapPin size={16}/>: ''} {company?.address}
                        </span> 
                    <span className='text-xs text-orange-500 flex items-center gap-2'>Registered. {moment(company?.createdAt, "YYYYMMDD").fromNow()}</span>
                </div>
            </div>
            <div className='flex flex-row gap-2 items-center'>
                <Button variant="outline" size="sm" asChild>
                <span  className="flex  leading-none">
                    Open
                </span> 
                </Button>
            </div>
        </Link>
  );
}

export default CompanyProfile;
