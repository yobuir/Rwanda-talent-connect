'use client';

import React, { useState } from 'react'

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
function GenderIdentifier({onGenderSelect,handleResetGender}) {
    const [role, setRole] = useState('');
    const [gender, setGender] = useState(''); 
    
    const handleGenderChange = (e) => {
        setGender(e.target.value);
        onGenderSelect(e.target.value);  
    };

    const handleResetFields = () => {
        setGender('');
        setRole('');
        handleResetGender();
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
            <ul className="grid gap-6 md:grid-cols-3">
                <li>
                    <Input
                        type="radio" 
                        id="female" 
                        name="gender"
                        onChange={handleGenderChange}
                        value="female" 
                        className="hidden peer" 
                        required 
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