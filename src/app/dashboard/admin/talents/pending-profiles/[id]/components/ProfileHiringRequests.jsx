import CustomAvatar from '@/app/components/CustomAvatar'
import { Button } from '@/components/ui/button' 
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RequestCard from './sub/RequestCard'


function ProfileHiringRequests() {
  return (
    <>
      <div className='flex flex-1 flex-col gap-4 w-full'>
        <Card className='shadow-sm'>
            <CardHeader>
                <CardTitle>
                    <div className='flex justify-between'>
                        <p className='font-bold text-sm'>All Hiring Requests</p>
                    </div>
                </CardTitle>
                <CardDescription> Hiring requests from potential employers </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='flex flex-col space-y-4'>
                    <div className='flex justify-between gap-3'>
                        <div className='flex-1'>
                            <Input placeholder="Search" />
                        </div> 
                    </div>
                    <div className='flex flex-col gap-2'> 
                        <RequestCard/>
                    </div>
                </div>
                
            </CardContent>
        </Card>
    </div>
    </>
  )
}

export default ProfileHiringRequests