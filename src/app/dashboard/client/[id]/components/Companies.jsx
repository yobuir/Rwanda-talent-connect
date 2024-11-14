'use client';
import { CustomDialog } from '@/app/components/CustomDialog'; 
import CustomFileUpload from '@/app/components/CustomFileUpload';
import CompanyProfile from '@/app/dashboard/components/CompanyProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CirclePlus, Pencil } from 'lucide-react';
import React from 'react';

function Companies() {

    const [add, setAdd] = React.useState(true);

    const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <div className="flex gap-1 items-center justify-center"><CirclePlus size={16}/><span className='hidden lg:block'>organization</span></div>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4"> 
            <div className='flex flex-col gap-4'> 
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="headline" className="text-left">
                        What is your company name
                    </Label>
                    <Input id="company_name"  placeholder="Enter company name" onChange={(e) => setHeadline(e.target.value)}  className="col-span-1" />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="location" className="text-left">
                        What is your company location
                    </Label>
                    <Input id="location"  placeholder="Enter company location" onChange={(e) => setHeadline(e.target.value)}  className="col-span-1" />
                </div>
                
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="headline" className="text-left">
                        Upload company logo
                    </Label>
                    <CustomFileUpload />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="bio" className="text-left">
                        What is your company description (optional)            
                    </Label>
                    <Textarea id="bio" rows={6} onChange={(e) => setBio(e.target.value)} placeholder="Write a few sentences about yourself" className="col-span-3"></Textarea>
                </div>
                
                <div className="flex flex-col  gap-4">
                    <Button>
                        Continue 
                    </Button>   
                </div>
            </div>
        </div>
    )
  return (
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
            <h1 className='font-semibold text-lg '>🏢 My organizations [ Manage all ]  </h1>
                <CustomDialog trigger={trigger} content={content} title="🏢 Add new organization ." description="Add organization details and all information are required." />
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
                <h3 className=''> Manage your organizations [add ,update, remove] them </h3>
            </div>
            <div className='flex gap-2 flex-col mt-5'>
                <CompanyProfile/>
                <CompanyProfile />
            </div>
        </CardContent>
    </Card> 
  );
}

export default Companies;
