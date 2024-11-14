import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BadgeCheck, Lock, User } from 'lucide-react'
import React from 'react'
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
 

function GAccount() {
  return (
  <div className='flex flex-col gap-6'>
     <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
                <h1 className='font-semibold text-lg flex items-center gap-2'><BadgeCheck /> Profile  Verification status  </h1>
            </div>
            <div className='flex gap-2 justify-between mb-4 items-center text-gray-500'>
                <h3 className=''> Verifying your profile information. </h3>
            </div>
            <div className='flex gap-2 justify-between flex-wrap items-center mb-5'> 
                <Badge>Verified</Badge>
            </div> 
            <Alert> 
                <AlertTitle>Verified </AlertTitle>
                <AlertDescription>
                    Your profile has been verified. Now your account/Profile will be visible to the public.
                </AlertDescription>
            </Alert>
        </CardContent>
    </Card>
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
                <h1 className='font-semibold text-lg flex items-center gap-2'><User/> Profile  setting  </h1>
            </div>
            <div className='flex gap-2 justify-between mb-4 items-center text-gray-500'>
                <h3 className=''> Edit your profile information. </h3>
            </div>
            <div className='flex gap-2 justify-between flex-wrap items-center'>
                <div className='w-full'>
                    <Label htmlFor="name" className="text-left">Name</Label>
                    <Input id="name" type="text" className="w-full" />    
                </div>
                <div className='w-full'>
                    <Label htmlFor="email" className="text-left">Email</Label>
                    <Input id="email" type="email" className="w-full" />    
                </div>
                <div className='w-full'>
                    <Label htmlFor="phone" className="text-left">Phone</Label>
                    <Input id="phone" type="text" className="w-full" />    
                </div>
                <Button className='w-full mt-4'>Save changes</Button>
            </div>

        </CardContent>
    </Card>
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
                <h1 className='font-semibold text-lg flex items-center gap-2'><Lock/> Password setting  </h1> 
            </div>
            <div className='flex gap-2 justify-between mb-4 items-center text-gray-500'>
                <h3 className=''> Change your password </h3>
            </div> 
            <div className='flex gap-2 justify-between flex-wrap items-center'>
                <div className='w-full'>
                    <Label htmlFor="current_password" className="text-left">Current password</Label>
                    <Input id="current_password" type="password" className="w-full" />
                </div>
                <div className='w-full'>
                    <Label htmlFor="new_password" className="text-left">New password</Label>
                    <Input id="new_password" type="password" className="w-full" />
                </div>
                <div className='w-full'>
                    <Label htmlFor="confirm_password" className="text-left">Confirm password</Label>
                    <Input id="confirm_password" type="password" className="w-full" />
                </div>
                <Button className='w-full mt-4'>Save changes</Button>
            </div>
        </CardContent>
    </Card>
  </div> 
  )
}

export default GAccount