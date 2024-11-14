'use client';  // Make this a client component if you need React hooks like useEffect

import React, { useEffect, useState } from 'react';
import { Building, ChevronLeft, LockKeyholeIcon, MapPin, UserPen } from 'lucide-react';
import NavBar from '@/app/components/Header/NavBar';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Profile from './components/Profile';
import Companies from './components/Companies';
import GAccount from '@/app/talents/[id]/components/General/GAccount';
import { getUser } from '@/utils/talentConnect/users/getUser';
import { getInitialsLetters } from '@/lib/getInitialsNames';

export default function Page() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      getUser().then((data) => {
        setUser(data);
      });
    }
  }, [user]); 
  return (
    <div className='relative bg-white'>
      <NavBar />
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className="lg:px-12 p-2 lg:max-w-7xl w-full lg:mx-auto lg:min-w-[80%] flex flex-col gap-6">
          <div className='flex gap-2 w-full lg:flex-row flex-col lg:justify-between lg:items-center'>
            <Link href='/dashboard' className='flex gap-2 items-center'>
              <span className='text-orange-500 bg-orange-500/20 p-2 rounded-full hover:bg-orange-500 hover:text-white'>
                <ChevronLeft size={26} />
              </span>
              <span className='text-xl font-semibold'>{user?.fullName || "Loading..."}</span>
            </Link>
          </div>

          <div className='flex lg:flex-row flex-col flex-wrap gap-4'>
            <div className='flex flex-col lg:w-[30%] w-full'>
              <Card className="shadow-none border flex flex-col w-full border-gray-200 relative">
                <CardContent className="flex flex-col justify-center items-center p-6">
                  <div className='px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg'>
                    <div className='relative flex justify-center items-center bg-orange-400 rounded-full w-52 h-52'>
                      <Avatar className="rounded-full border-2 border-orange-500 w-full h-full">
                        <AvatarImage src={user?.profilePicture || "https://github.com/shadcn.png"} />
                        <AvatarFallback>{getInitialsLetters(user?.fullName)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='flex gap-2 mt-4 flex-col justify-center items-center'>
                      <h3 className="text-3xl font-semibold text-center">{user?.fullName || ""}</h3>
                      <p className='text-sm text-gray-500'>{user?.talentProfile?.headline || ""}</p>
                      <span className="text-gray-600 flex gap-1 items-center text-sm">
                        {user?.address && <MapPin size={16} />} {user?.address || ""}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className='flex lg:w-[68%]'>
              <Card className="shadow-none border border-gray-200 relative w-full">
                <CardContent className="flex flex-col p-6">
                  <Tabs defaultValue="profile" className="">
                    <TabsList className="gap-6">
                      <TabsTrigger value="profile" className="flex gap-2 items-center">
                        <UserPen size={16} />
                        <span className='lg:block hidden'>Profile</span>
                      </TabsTrigger>
                      <TabsTrigger value="org_company" className="flex gap-2 items-center">
                        <Building size={16} />
                        <span className='lg:block hidden'>Org/Company</span>
                      </TabsTrigger>
                      <TabsTrigger value="account" className="flex gap-2 items-center">
                        <LockKeyholeIcon size={16} />
                        <span className='lg:block hidden'>Account</span> 
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="profile" className="flex flex-col gap-6">
                      <Profile  user={user} />
                    </TabsContent>

                    <TabsContent value="org_company">
                      <Companies user={user} />
                    </TabsContent>

                    <TabsContent value="account">
                      <GAccount user={user}/>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
