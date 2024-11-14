'use client';
import React, { useEffect, useState } from 'react';  
import { ChevronLeft, FileUp, Handshake, ImageUp, LockKeyholeIcon, Star, UserPen } from 'lucide-react'; 
import NavBar from '@/app/components/Header/NavBar';

import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
import GBasicInformation from './components/General/GBasicInformation'; 
import GCertificatesResume from './components/General/GCertificatesResume';
import GMedia from './components/General/GMedia'; 
import GAccount from './components/General/GAccount'; 
import GHiringRequests from './components/General/GHiringRequests';
import { getUser } from '@/utils/users/getUser';
import { Skeleton } from 'antd';
import ProfileInformation from './components/ProfileInformation';
import GRecommendations from './components/General/GRecommendations';

function Page() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUser()
      .then((data) => {
        setUser(data);
      })
      .finally(() => setLoading(false));
  }, []); 
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Skeleton active /></div>;
  }
  return ( 
      <div className='relative bg-white'>
        <NavBar/>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className=" lg:px-12 p-2 lg:max-w-7xl w-full lg:mx-auto lg:min-w-[80%]  flex flex-col gap-6">
            <div className='flex  gap-2 w-full lg:flex-row flex-col  lg:justify-between lg:items-center'>
              <a href='/talents' className='flex gap-2 items-center'>
                <span className='text-orange-500 bg-orange-500/20 p-2 rounded-full hover:bg-orange-500 hover:text-white '> <ChevronLeft size={26} /></span>
                <span className='text-xl font-semibold'>Explore talents </span>
              </a>
            </div>
            <div className='flex  lg:flex-row flex-col flex-wrap gap-4'>
              <ProfileInformation userData={user} loading={loading}/>
              <div className='flex lg:w-[68%]'>
                <Card className="shadow-none border  border-gray-200 relative w-full">
                  <CardContent className="flex flex-col    p-6">
                    {loading ? (
                    <Skeleton active paragraph={{ rows: 6 }} />
                  ) : (
                    <Tabs defaultValue="recommendations" className="">
                        <TabsList className="gap-6 flex flex-wrap h-auto items-start justify-start pt-3 px-3">
                            <TabsTrigger value="profile" className="flex gap-2 items-center">
                              <UserPen size={16} />
                              <span className='lg:block hidden'>Profile</span>  
                            </TabsTrigger>
                            {/* <TabsTrigger value="certificates_and_resume" title="Resume & Certificates" className="flex gap-2 items-center">
                              <FileUp size={16} />
                              <span className='lg:block hidden' >CV & Cert...</span>  
                            </TabsTrigger>  */}
                            <TabsTrigger value="media" className="flex gap-2 items-center">
                              <ImageUp size={16} />
                              <span className='lg:block hidden'>Media</span>  
                            </TabsTrigger> 
                            <TabsTrigger value="hiring_request" className="flex gap-2 items-center">
                              <Handshake  size={16} />
                              <span className='lg:block hidden'>Hiring req...</span>  
                            </TabsTrigger> 
                            <TabsTrigger value="recommendations" className="flex gap-2 items-center">
                              <Star  size={16} />
                              <span className='lg:block hidden'>Recommendations</span>  
                            </TabsTrigger> 
                            <TabsTrigger value="account" className="flex gap-2 items-center">
                              <LockKeyholeIcon size={16} />
                              <span className='lg:block hidden'>Account</span>  
                            </TabsTrigger> 
                        </TabsList>
                        <TabsContent value="profile" className="flex flex-col gap-6">
                            <GBasicInformation/>
                        </TabsContent>
                        {/* <TabsContent value="certificates_and_resume">
                          <GCertificatesResume/>
                        </TabsContent> */}
                        <TabsContent value="media">  
                          <GMedia/>
                        </TabsContent>
                        <TabsContent value="hiring_request">  
                          <GHiringRequests/>
                        </TabsContent>
                        
                        <TabsContent value="recommendations">  
                          <GRecommendations/>
                        </TabsContent>
                        
                        <TabsContent value="account">  
                          <GAccount/>
                        </TabsContent> 
                    </Tabs> 
                    )} 
                  </CardContent>
                </Card>
              </div>
            </div> 
          </div> 
        </div>
        
      </div>
  );
}
export default Page;