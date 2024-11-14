'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
import { toast } from '@/hooks/use-toast';
function AccountType({ onRoleSelect }) {

        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null);
    const [role, setRole] = useState(''); 

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        submitAllChanges(e.target.value);
    };

    const submitAllChanges = async (role) => {
        
        setLoading(true);
    
        try {
            console.log(role)
            const updateData = {};
            if (role) updateData.role = role;
        
            const response = await UpdateUSer(   
                updateData,
            );
            
            if (response.code==200) { 
                toast({
                    variant: "default",
                    title: "Profile updated Successfully",
                    description: "Your profile has been updated successfully.",
                    }); 
                
            onRoleSelect(role);
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
    <div>
    <h3 className="mb-5 text-lg font-medium text-gray-900 dark:text-white">
        Sign up as
    </h3>
    {
        loading && <p>Loading...</p>
    }
    <ul className="grid gap-6 md:grid-cols-2">
        <li>
            <Input
                type="radio" 
                id="talent" 
                name="role"
                onChange={handleRoleChange}
                value="talent" 
                className="hidden peer" 
             
                disabled={loading}
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

                disabled={loading}
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
