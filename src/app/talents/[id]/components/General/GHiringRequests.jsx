import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PendingProfile from '../HiringRequest'

function GHiringRequests() {
  return (
    <div className='flex-1'>
        <div className='flex flex-1 flex-col gap-4 w-full'>
            <div className='flex flex-1 flex-col gap-4 w-full'>
                <Card className='shadow-sm'>
                    <CardHeader>
                        <CardTitle>
                            <div className='flex justify-between'>
                                <p className='font-bold text-sm'>All hiring requests</p>
                            </div>
                        </CardTitle>
                        <CardDescription> All hiring requests received </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='flex flex-col space-y-4'>
                            <PendingProfile />
                            <PendingProfile />
                            <PendingProfile />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div> 
    </div>
  )
}

export default GHiringRequests