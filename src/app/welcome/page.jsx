'use client';

import React, { useState } from 'react';  
import NavBar from '../components/Header/NavBar';
import Head from 'next/head';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft, SaveAll } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import CustomFileUpload from '../components/CustomFileUpload';
import AccountType from './components/AccountType';
import GenderIdentifier from './components/GenderIdentifier';
import CompanyNew from './components/CompanyNew';
import UserInformation from './components/UserInformation';
import useAuthStore from '@/store/authStore';
import { UpdateUSer } from '@/utils/updateUser';

function Page() {
    const { user, isEmailVerified } = useAuthStore(); 
    const [role, setRole] = useState('');
    const [gender, setGender] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState('');
    const [confirmedBioHeadline, setConfirmedBioHeadline] = useState(false);
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

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
        if(!user){
            alert("Please login to continue");
            return;
        }
        try {
            // Make the API call to update user data
            const response = await UpdateUSer(
                user._id, // id
                user.fullName, // name
                user.phoneNumber || '', // phone
                user.email, // email
                role, // role
                gender, // gender
                headline, // headline
                bio, // bio
                age, // age
                height, // height
                weight // weight
            );

            if (response.success) {
                alert('Profile updated successfully!');
                console.log('Updated user:', response.user);
            } else {
                console.error('Error updating profile:', response.error);
                alert(`Error updating profile: ${response.error.message || response.error}`);
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            alert('An unexpected error occurred. Please try again.');
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
                                            <Button onClick={() => submitAllChanges()}>
                                                <SaveAll/>
                                                Save changes
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
                                <h1 className="lg:text-4xl text-center text-xl font-bold ">Welcome, {user?.fullName}</h1>
                                {
                                    gender ?(
                                    <>
                                    { 
                                        <>
                                        <CompanyNew/>     
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
