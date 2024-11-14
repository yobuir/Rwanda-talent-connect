'use client';

import React, { useEffect, useState } from 'react';  
import NavBar from '../components/Header/NavBar';
import Head from 'next/head'; 
import {  SaveAll } from 'lucide-react';
import { Button } from '@/components/ui/button'; 
import AccountType from './components/AccountType';
import GenderIdentifier from './components/GenderIdentifier';
import CompanyNew from './components/CompanyNew';
import UserInformation from './components/UserInformation'; 
import { UpdateUSer } from '@/utils/users/updateUser';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

function Page() {  
  const { toast } = useToast();
    const { data: session, status } = useSession();  
   
    const user = session?.user || null; 
    const router = useRouter() 
    useEffect(() => {
        if (status === 'unauthenticated' && status !== 'loading') {
        router.push('/auth/login')
        }

    }, [status,router]);

    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState('');
    const [confirmedBioHeadline, setConfirmedBioHeadline] = useState(false);
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    
    const [loading, setLoading] = useState(false);

    const handleRoleSelect = (selectedRole) => {
        setRole(selectedRole);
    };

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
    };

    const handleResetGender = () => {
        setGender('');
        setRole('');
    };

    const handleUserData = (userData) => { 
        console.log("User Data received from child:", userData);
        setHeadline(userData.headline);
        setBio(userData.bio);
        setAge(userData.age);
        setHeight(userData.height);
        setWeight(userData.weight);
        
    };

  
    const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {
                const updateData = {};
                if (headline) updateData.headline = headline;
                if (bio) updateData.bio = bio;
                if (age) updateData.age = age;
                if (height) updateData.height = height;
                if (weight) updateData.weight = weight;
                if (gender) updateData.gender = gender;
                if (role) updateData.role = role;

            // Make the API call to update user data
            const response = await UpdateUSer(   
                updateData
            );

            if (response.success) { 
                toast({
                    variant: "default",
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully.",
                    }); 
                router.push('/dashboard');
            } else { 
                toast({
                    variant: "destructive",
                    title: "Profile Update Failed",
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
        <div className="relative bg-white"> 
            <Head>
                <title>Select Your Role - Talent or Employer</title>
                <meta 
                    name="description" 
                    content="Choose your role to get started. Are you a Talent looking for opportunities or an Employer searching for the right candidate? Make your selection now." 
                />
            </Head> 
            <NavBar /> 
            <div className="flex flex-col lg:flex-row gap-3">
                <div className="min-h-[70vh] px-12 mx-auto lg:w-[80%] flex justify-center items-center flex-col gap-6">
                    {
                        role?(
                            <>
                            {
                            role=== 'talent'? (
                            <>
                                <div className="flex flex-col gap-6">
                                    <h1 className="lg:text-4xl text-center text-xl font-bold ">Welcome to Talent pool</h1>
                                    {
                                        gender ?(
                                        <>
                                        <UserInformation  onSubmitUserData={handleUserData}  />
                                        </>):(<> 
                                        <GenderIdentifier onGenderSelect={handleGenderSelect} handleResetGender={handleResetGender} />
                                        </>)
                                    }
                                <div className="flex flex-col gap-4">
                                    {gender && role && headline && bio && age && height && weight && (
                                        <>
                                            <Button onClick={() => submitAllChanges()} disabled={loading}>
                                                <SaveAll/>
                                                {loading ? "Loading..." : "Save changes"}
                                            </Button> 
                                        </>
                                    )
                                    }
                                </div>
                            </div>
                            </>
                            ):
                            (
                            <div className='flex flex-col gap-4'>
                                <h1 className="lg:text-4xl text-center text-xl font-bold ">Welcome, {user?.name}</h1>
                                {
                                    gender ?(
                                    <>
                                    { 
                                        <>
                                            <CompanyNew gender={gender} userId={user.id}/>     
                                        </> 
                                    }
                                    </>):(<> 
                                        <GenderIdentifier onGenderSelect={handleGenderSelect} handleResetGender={handleResetGender} />
                                    </>
                                    )
                                }

                            </div>
                            )
                            }
                            </> 
                        ):
                        (
                        <AccountType onRoleSelect={handleRoleSelect}/>                        
                        )
                    }

                
                </div>
            </div>
        </div>
    );
}

export default Page;
