import React, { useEffect, useState } from 'react';  
import {GraduationCap,Languages,MapPin, Tag } from 'lucide-react'; 
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CustomDialog } from '@/app/components/talentConnect/CustomDialog';
import { Button } from '@/components/ui/button';
import { getCategories } from '@/utils/talentConnect/categories/getAll';
import Skeleton from 'react-loading-skeleton'; 
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
import { getCategoryById } from '@/utils/talentConnect/categories/getCategory';

function ProfileInformation({userData, loading}) {

    const [user, setUser] = useState({})
    const [categories, setCategories] = useState([])
    const [loadingCategories, setLoadingCategories] = useState(true); 
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [categoryName, setCategoryName] = useState(null);

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    }
  
    useEffect(() => {
        setUser(userData)
        getCategories()
            .then((data) => {
                setCategories(data?.categories);
            })
            .finally(() => setLoadingCategories(false));
    },[userData])

    useEffect(() => {
    if (!userData?.talentProfile?.categoryId) {
        setIsDialogOpen(true);
        return;
    }
    getCategoryById(userData?.talentProfile?.categoryId).then((data) => {
        setSelectedCategory(data?.category?._id);
        setCategoryName(data?.category?.name);
    })
}, [userData?.talentProfile?.categoryId]);
    const handleSave = async () => {
        setLoadingSubmit(true);
        try {
            const updateData = {};
            if (selectedCategory) updateData.categoryId = selectedCategory; 

            const response = await UpdateUSer(updateData); 

            if (response.status =='success') { 
                toast({
                    variant: "default",
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully.",
                    });   
            } else { 
                toast({
                    variant: "destructive",
                    title: "Profile Update Failed",
                    description: "An error occurred while updating your profile. Please try again.",
                });
            }
        } catch (error) { 
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again" ,
                description: error.message || "An unexpected error occurred. Please try again later.",
            });
        }
        finally {
        setLoadingSubmit(false);
        }

    } 

    const content = (
        <div className="grid gap-4 py-4 pt-0">
            <div className="flex flex-col gap-4">
                <div className="grid lg:grid-cols-1 grid-cols-1 gap-4 ">
                    {
                        loadingCategories ? (
                            <div className="flex justify-center items-center h-screen">
                                <Skeleton active />
                            </div>
                        ) : (  
                            <div  className="flex gap-2 items-center">
                                <ul className="flex flex-wrap gap-6 ">
                                    {
                                    categories?.map((category) => (
                                        <li key={category?._id}>
                                            <Input
                                                type="radio" 
                                                id={category?._id} 
                                                name="category"
                                                onChange={handleCategoryChange}
                                                value={category?._id} 
                                                className="hidden peer"   
                                            />
                                            <Label 
                                                htmlFor={category?._id} 
                                                className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-orange-500 peer-checked:border-orange-600 peer-checked:text-orange-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                            >
                                                <div className="block">
                                                    <div className="w-full text-lg font-semibold text-black">{category?.name}</div>
                                                </div> 
                                            </Label>
                                        </li>   
                                        ))
                                    } 
                                </ul>
                            </div>
                        )
                    } 
                    <div className="flex justify-end  gap-4">
                        <Button onClick={handleSave} className="" disabled={loadingSubmit}>
                            {loadingSubmit ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

  return (
    <div className='flex flex-col lg:w-[30%] w-full'>
                <Card className="shadow-none border flex flex-col w-full border-gray-200 relative">
                  <CardContent className="flex flex-col  justify-center items-center  p-6">
                    
                  {loading ? (
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                    ) : (
                        <>  
                        <CustomDialog  
                            trigger={``}
                            content={content}
                            title="Choose category which best describe you?" 
                            description=""
                            DialogOpen={isDialogOpen}
                        />
                        <div className='px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg'>
                            <div  className='relative flex justify-center items-center bg-orange-400 rounded-full w-52 h-52'>  
                                <Avatar className="rounded-full border-2 border-orange-500 w-full h-full">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <span className='text-sm items-center flex gap-1 absolute bottom-0 px-3 py-1 bg-orange-500 text-white p-0 border-2 border-white rounded-full'>
                                    <Tag size={16}/>  
                                    {categoryName}
                                </span>  
                            </div>  
                        
                            <div className='flex gap-2 mt-4 flex-col justify-center items-center'>
                                <h3 className="text-3xl font-semibold text-center">{user?.fullName}</h3>
                                <p className='text-sm text-gray-500 '> {user?.headline || ""}</p>
                                <span className="text-gray-600 flex gap-1 items-center text-sm"> <MapPin size={16} /> {user?.address || "Kigali"}</span>
                            </div>  
                            <div className='flex gap-6 mt-4 flex-col'>
                            <div className='flex gap-2 flex-col'>
                                <h3 className="font-semibold text-sm uppercase">Rate</h3>
                                <div className='flex text-sm'>
                                <div className='bg-orange-500/10 text-orange-800 px-4 py-1 rounded-full flex gap-3'> 
                                    {user?.talentProfile?.rate?.amount ?? 'Set your rate per hour.'} {user?.talentProfile?.rate?.currency??''}  / hr
                                </div>
                                </div>
                            </div>
                            <div className='flex gap-2 flex-col'> 
                                <div className='flex gap-2 items-start font-bold  mb-3'> 
                                <GraduationCap size={20} />   <h3 className="text-sm uppercase">Skills</h3> 
                                </div>
                                <div className='flex '>
                                <div className=''> 
                                    <ul className='flex flex-wrap gap-2'> 
                                    {
                                        user?.talentProfile?.skills?.map((skill, index) => (
                                        <li  className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'  key={index}>{skill}</li>
                                        ))
                                    }    
                                    </ul>
                                </div>
                                </div>
                            </div> 
                            <div className='flex gap-1 flex-col items-start'>
                                <div className='flex gap-2 items-start font-bold  mb-3'> 
                                <Languages size={20} />   <h3 className="text-sm uppercase">Languages</h3> 
                                </div>
                                <div>
                                    <ul className='flex flex-wrap gap-2'> 
                                    {
                                        user?.talentProfile?.languagesSpoken?.map((language, index) => (
                                        <li className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3' key={index}>{language}</li>
                                        ))
                                    } 
                                </ul>
                                </div>
                            </div>
                            </div>
                        </div>  
                        </>
                     
                    )}
                  </CardContent>
                </Card>
              </div>
  )
}

export default ProfileInformation