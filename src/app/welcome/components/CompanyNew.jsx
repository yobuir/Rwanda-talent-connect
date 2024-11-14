import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CustomFileUpload from '@/app/components/CustomFileUpload';
function CompanyNew() { 
    const [gender, setGender] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState(''); 
  return (
   <>
      
   <div className='flex gap-2 items-center'>
        <Button onClick={() => setGender('')} className='text-orange-500 bg-orange-500/20 p-2 rounded hover:bg-orange-500 hover:text-white '> 
            <ChevronLeft size={26} />
        </Button> 
        <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
        Company information
        </h3>
    </div> 
    <div className='grid grid-cols-2  gap-4 mt-5'> 
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
    </>
  );
}

export default CompanyNew;
