"use client"
import Charts from '@/app/components/talentConnect/admin/Charts'
import CustomCard from '@/app/components/talentConnect/admin/CustomCard'
import CustomAvatar from '@/app/components/talentConnect/CustomAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React, { useState } from 'react' 
import PendingProfile from './talents-connect/talents/pending-profiles/PendingProfile'
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/navigation';

function Page() {

   const route=useRouter()
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  if(session?.user?.role ==="talent" || session?.user?.role ==="employer"){
    route.push(`/talent-connect/talents`)
  }

   if (loading) {
      return <div className="flex justify-center items-center h-screen"><Skeleton active /></div>;
    }
  return ( 
    <div className='flex flex-1 flex-col gap-4 p-4 w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 flex-wrap'>
          <CustomCard total={125} title="Companies"  description="All companies " link="/dashboard/admin/talents-connect/companies"  /> 
          <CustomCard total={677} title="Talents"  description="All talents " link="/dashboard/admin/talents-connect/talents"  /> 
          <CustomCard total={98} title="Users"  description="All users " link="/dashboard/admin/users"  /> 
      </div> 
    </div>

  )
}

export default Page