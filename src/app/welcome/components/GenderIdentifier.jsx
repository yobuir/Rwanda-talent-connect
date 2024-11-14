'use client';

import React, { useState } from 'react'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import { toast } from '@/hooks/use-toast';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
function GenderIdentifier({onGenderSelect,handleResetGender}) {
    const [role, setRole] = useState('');
    const [gender, setGender] = useState(''); 
    
            const [loading, setLoading] = useState(false);
            const [error, setError] = useState(null);
    const handleGenderChange = (e) => {
        setGender(e.target.value);
        
        submitAllChanges(e.target.value);
    
    };

    const handleResetFields = () => {
        setGender('');
        setRole('');
        handleResetGender();
    };


     const submitAllChanges = async (gender) => {
        
        setLoading(true);
    
        try { 
            const updateData = {};
            if (gender) updateData.gender = gender;
        
            const response = await UpdateUSer(   
                updateData,
            );
            
            if (response.code==200) { 
                toast({
                    variant: "default",
                    title: "Profile updated Successfully",
                    description: "Your profile has been updated successfully.",
                    }); 
                
                    
            onGenderSelect(gender);  
            } else { 
                
                toast({
                    variant: "destructive",
                    title: "Profile update Failed",
                    description: "An error occurred while updating your profile. Please try again.",
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
      <div className='flex flex-col gap-4'>
            <div className='flex gap-2 items-center mt-5'>
                {/* <Button onClick={handleResetFields} className='text-orange-500 bg-orange-500/20 p-2 rounded hover:bg-orange-500 hover:text-white '> 
                    <ChevronLeft size={26} />
                </Button>  */}
                <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                    🧬  What is your gender?
                </h3>
            </div> 
             {
        loading && <p>Loading...</p>
    }
            <ul className="grid gap-6 md:grid-cols-3">
                <li>
                    <Input
                        type="radio" 
                        id="female" 
                        name="gender"
                        onChange={handleGenderChange}
                        value="female" 
                        className="hidden peer" 
                        
                disabled={loading}
                    />
                    <Label 
                        htmlFor="female" 
                        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-black">Female</div>
                        </div> 
                    </Label>
                </li>
                <li>
                    <Input 
                        type="radio" 
                        id="male" 
                        name="gender" 
                        onChange={handleGenderChange}
                        value="male" 
                        className="hidden peer"

                disabled={loading}
                    />
                    <Label 
                        htmlFor="male" 
                        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-black">Male</div>
                        </div> 
                    </Label>
                </li>
                <li>
                    <Input 
                        type="radio" 
                        id="other" 
                        name="gender"
                        onChange={handleGenderChange}
                        value="other" 
                        className="hidden peer"

                disabled={loading}
                    />
                    <Label 
                        htmlFor="other" 
                        className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        <div className="block">
                            <div className="w-full text-lg font-semibold text-black">Other</div>
                        </div> 
                    </Label>
                </li>
            </ul>
        </div>
  )
}

export default GenderIdentifier