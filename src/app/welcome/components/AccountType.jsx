'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
function AccountType({ onRoleSelect }) {

    const [role, setRole] = useState(''); 

        const handleRoleChange = (e) => {
            setRole(e.target.value);
            onRoleSelect(e.target.value);
        };
  return (
    <div>
    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Sign up as
    </h3>
    <ul className="grid gap-6 md:grid-cols-2">
        <li>
            <Input
                type="radio" 
                id="talent" 
                name="role"
                onChange={handleRoleChange}
                value="talent" 
                className="hidden peer" 
                required 
            />
            <Label 
                htmlFor="talent" 
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="block">
                    <div className="w-full text-lg font-semibold text-black">Talent</div>
                    <div className="w-full text-xs">
                        Are you looking for opportunities to showcase your skills and find the perfect job? Select this option to explore talent options.
                    </div>
                </div> 
            </Label>
        </li>
        <li>
            <Input 
                type="radio" 
                id="employer" 
                name="role" 
                onChange={handleRoleChange}
                value="employer" 
                className="hidden peer"
            />
            <Label 
                htmlFor="employer" 
                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <div className="block">
                    <div className="w-full text-lg font-semibold text-black">Employer</div>
                    <div className="w-full text-xs">
                        Are you an employer searching for the perfect candidates to join your team? Select this option to find talent.
                    </div>
                </div> 
            </Label>
        </li>
    </ul>
</div>
  );
}

export default AccountType;
