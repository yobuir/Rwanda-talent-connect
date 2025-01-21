'use client';
import NavBar from '@/app/components/Header/NavBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';
import { getCategoryById } from '@/utils/talentConnect/categories/getCategory';
import {  getUserByIdProfile } from '@/utils/talentConnect/users/getUserById';
import { Skeleton } from 'antd';
import { ArrowRightLeft, Building, Calendar, ImageUp, Link, Map, Star, Tag, User, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import HireNotice from '../../[id]/components/HireNotice';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Profile from './components/Profile';
import Media from '../../components/GMedia/Media';
import GRecommendations from '../../[id]/components/General/GRecommendations';

export default function Page({params}) {

    const [activeTab, setActiveTab] = useState('tweets');
    const [user, setUser] =useState('');
    const [userId, setUserId] = useState();
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => { 
    setLoading(true);

      async function fetchParams() {
        const resolvedParams = await params; 
        setUserId(resolvedParams?.id);  
      }
      fetchParams().finally(()=>setLoading(false))
    }, [params]);


  useEffect(() => {
    const fetchUser = async () => {
        try {
            const response = await getUserByIdProfile({ id: userId });
            if (!response) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching user data',
                    description: response.message || 'Unable to fetch user details. Please try again later.',
                });
            } else {
                setUser(response); 
            }
    } catch (error) { 
            toast({
                variant: 'destructive',
                title: 'Error fetching user data',
                description: error.message || 'Unable to fetch user details. Please try again later.',
            });
    }
    };
    fetchUser();
  }, [userId]);

    useEffect(() => {
        if (user?.talentProfile?.categoryId) {
            getCategoryById(user?.talentProfile?.categoryId).then((data) => {
                setCategoryName(data?.category?.name);
            });
        }
    }, [user?.talentProfile?.categoryId]);


  console.log(user);
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Skeleton active /></div>;
  }

  if(!user?.isProfilePublished){
    return <div className="flex justify-center items-center h-screen">Profile not available yet.</div>;
  }

  return (
    <div className="relative bg-white mb-6 " >
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-3 p-4 py-0">
            <div className="min-h-screen  lg:px-12 mx-auto   w-full lg:w-[80%]">
                <div className="flex flex-col gap-4 max-w-[100%] mx-auto"> 
                    <div className="w-full bg-white">
                    {/* Cover Photo */}
                    <div className="bg-gray-300 h-48 w-full"></div>
                    {/* Profile Info */}
                    <div className="px-4 relative">
                        <div className="absolute -top-16"> 
                            <Avatar className="w-32 h-32 border-4 border-orange-500/20 group-hover:border-orange-500 transition-all">
                                <AvatarImage 
                                    src={user?.profileImage || "https://github.com/shadcn.png"} 
                                    alt={user?.fullName}
                                    className="object-cover"
                                />
                                <AvatarFallback>{user?.fullName?.charAt(0) || 'T'}</AvatarFallback>
                            </Avatar> 
                        </div>
                        <div className="pt-20 flex flex-col">
                            <div className='flex lg:flex-row justify-between gap-2'>
                                <div>
                                    <span className='italic text-sm'>{categoryName}</span>
                                    <h2 className="text-xl font-bold capitalize">{user?.fullName} </h2> 
                                </div>
                                <div>
                                    <HireNotice talent={user}/>
                                </div>
                            </div>
                            {user?.talentProfile?.headline &&(
                            <div className='flex items-center text-orange-500'>
                                <Tag className="mr-2 h-4 w-4 " />
                                <p className="my-2 font-bold ">{user?.talentProfile?.headline}</p>
                            </div>
                            )}
                            {user?.talentProfile?.bio && (
                            <p className="my-2">{user?.talentProfile?.bio}</p>)}
                            {/* Profile Details */}
                            <div className="flex space-x-4 text-gray-600 mb-4">
                                <div className="flex items-center"> 
                                    {user?.address && (
                                        <div className="flex items-center text-sm text-gray-700">
                                            <Map className="mr-2 h-4 w-4 text-gray-500" />
                                            {user.address}
                                        </div>
                                    )}
                                </div> 
                            </div> 
                        </div> 
                    </div>

                    <Tabs defaultValue="profile" className="" >
                        <TabsList className="gap-6 flex flex-wrap bg-orange-500/10 h-auto items-start justify-start pt-3 pb-3 px-3">
                                <TabsTrigger value="profile" className="flex text-orange-500 border border-orange-500 gap-2 items-center">
                                    <User size={16} />
                                    <span className='lg:block hidden '>Profile Details</span>  
                                </TabsTrigger>
                                <TabsTrigger value="media"  className="flex gap-2 text-orange-500 border border-orange-500  items-center">
                                    <ImageUp size={16} />
                                    <span className='lg:block hidden'>Media</span>  
                                </TabsTrigger>
                                <TabsTrigger value="recommendations" className="flex text-orange-500 border border-orange-500 gap-2 items-center">
                                    <Star  size={16} />
                                    <span className='lg:block hidden'>Recommendations</span>  
                                </TabsTrigger> 
                            </TabsList>
                            <TabsContent value="profile" className="flex flex-col gap-6">
                                <div className="space-y-3  w-full ">
                                    <Profile user={user} categoryName={categoryName}/>
                                </div>
                            </TabsContent>  
                            <TabsContent value="media" className="flex flex-col gap-6 w-full">
                                <div className="space-y-3 w-full "> 
                                    <Media talent={user} />
                                </div>
                            </TabsContent>  
                            <TabsContent value="recommendations" className="flex flex-col gap-6 w-full">
                                <div className="space-y-3 w-full "> 
                                    <GRecommendations talent={user}/>
                                </div>
                            </TabsContent>  
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}
