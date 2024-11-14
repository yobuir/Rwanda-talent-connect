import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CustomFileUpload from '@/app/components/CustomFileUpload';
import { UpdateUSer } from '@/utils/users/updateUser';
import { NewCompany } from '@/utils/companies/client/NewCompany';
function CompanyNew({gender,userId}) { 
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [logo, setLogo] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {

                const updateData = {};
                if (gender) updateData.gender = gender;
            
            await UpdateUSer(   
                updateData,
            );

            const companyData ={}
            if(companyName) companyData.companyName=companyName
            if(address) companyData.address=address
            if(activityDescription) companyData.activityDescription=activityDescription
            if(logo) companyData.logo=logo
            if(userId) companyData.userId=userId

            const response = await NewCompany(companyData);
            if (response.success) { 
                toast({
                    variant: "default",
                    title: "Company Created Successfully",
                    description: "Your company has been created successfully.",
                    }); 
                router.push('/dashboard');
            } else { 
                toast({
                    variant: "destructive",
                    title: "Company Creation Failed",
                    description: "An error occurred while creating your company. Please try again.",
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error); 
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again" ,
                description: error.message || "An unexpected error occurred. Please try again later.",
            });
        }
        finally {
        setLoading(false);
        }
    };

return (
    <>
        <div className='flex gap-2 items-center'>
            <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
            Company information
            </h3>
        </div> 
        <div className='grid grid-cols-2  gap-4 mt-5'> 
            <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="company_name" className="text-left">
                    What is your company name
                </Label>
                <Input id="company_name"  placeholder="Enter company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)}  className="col-span-1" />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="location" className="text-left">
                    What is your company location
                </Label>
                <Input id="address"  placeholder="Enter company location" value={address} onChange={(e) => setAddress(e.target.value)}  className="col-span-1" />
            </div>
            
            <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="headline" className="text-left">
                    Upload company logo
                </Label>
                <CustomFileUpload logo={logo} setLogo={setLogo} />
            </div>
            <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="bio" className="text-left">
                    What is your company description (optional)            
                </Label>
                <Textarea id="activityDescription" rows={6} value={activityDescription} onChange={(e) => setActivityDescription(e.target.value)} placeholder="Write a few sentences about your company" className="col-span-3"></Textarea>
            </div>
            
            <div className="flex flex-col  gap-4">
                <Button  onClick={submitAllChanges} className="w-full" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'} 
                </Button>   
            </div>
        </div>  
    </>
  );
}

export default CompanyNew;
