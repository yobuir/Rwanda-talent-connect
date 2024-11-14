"use client"
import Charts from '@/app/components/talentConnect/admin/Charts'
import CustomCard from '@/app/components/talentConnect/admin/CustomCard'
import CustomAvatar from '@/app/components/talentConnect/CustomAvatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react' 
import PendingProfile from './talents-connect/talents/pending-profiles/PendingProfile'

function page() {
  return ( 
    <div className='flex flex-1 flex-col gap-4 p-4 w-full'>
      <div className='grid grid-cols-1 lg:grid-cols-4 gap-4 flex-wrap'>
        {/* <CustomCard/>
        <CustomCard/>
        <CustomCard/> 
        <CustomCard/>  */}
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 flex-wrap'>
        <div className='flex flex-1 flex-col gap-4 w-full'>
          {/* <Charts/> */}
        </div>
        <div className='flex flex-1 flex-col gap-4 w-full'>
          <div className='flex flex-1 flex-col gap-4 w-full'>
            <Card className='shadow-sm'>
              <CardHeader>
                <CardTitle> 
                  <div className='flex justify-between'>
                    <p className='font-bold text-sm'>Pending verifications</p>
                    <Link href="/dashboard/admin/talents/pending-profiles" className="flex  leading-none">
                        View All
                      </Link> 
                    </div>
                </CardTitle>
                <CardDescription> Pending users for verification </CardDescription> 
              </CardHeader>
              <CardContent> 
                <div className='flex flex-col space-y-4'>
                  <PendingProfile/>
                </div> 
              </CardContent> 
            </Card> 
          </div>
        </div> 
      </div>
    </div>

  )
}

export default page