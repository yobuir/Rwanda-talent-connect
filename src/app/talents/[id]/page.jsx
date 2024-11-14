'use client';
import React from 'react';  
import { ChevronLeft, FileUp, Handshake, ImageUp, Languages, LockKeyhole, LockKeyholeIcon, MapPin, Star, Tag, UserPen } from 'lucide-react'; 
import NavBar from '@/app/components/Header/NavBar';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'; 
import GBasicInformation from './components/General/GBasicInformation'; 
import GCertificatesResume from './components/General/GCertificatesResume';
import GMedia from './components/General/GMedia';
import { Badge } from '@/components/ui/badge';
import GAccount from './components/General/GAccount';
import { Button } from '@/components/ui/button';
import HireNotice from './components/HireNotice';
import GHiringRequests from './components/General/GHiringRequests';

function page() {
  return ( 
      <div className='relative bg-white'>
        <NavBar/>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className=" lg:px-12 p-2 lg:max-w-7xl w-full lg:mx-auto lg:min-w-[80%]  flex flex-col gap-6">
            <div className='flex  gap-2 w-full lg:flex-row flex-col  lg:justify-between lg:items-center'>
              <Link href='/talents' className='flex gap-2 items-center'>
                <span className='text-orange-500 bg-orange-500/20 p-2 rounded-full hover:bg-orange-500 hover:text-white '> <ChevronLeft size={26} /></span>
                <span className='text-xl font-semibold'>Nate Bruzdzinski </span>
              </Link>
              <div className='flex gap-4 justify-end text-right flex-1'>
                <Button asChild variant="outline">
                  <Link href='/talents/1/hiring-requests' className='flex gap-2 items-center'>
                  Hiring requests
                  </Link>
                </Button> 
                <HireNotice/> 
              </div>
            </div>
            <div className='flex  lg:flex-row flex-col flex-wrap gap-4'>
              <div className='flex flex-col lg:w-[30%] w-full'>
                <Card className="shadow-none border flex flex-col w-full border-gray-200 relative">
                  <CardContent className="flex flex-col  justify-center items-center  p-6">
                    <div className='px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg'>
                        <div  className='relative flex justify-center items-center bg-orange-400 rounded-full w-52 h-52'>  
                            <Avatar className="rounded-full border-2 border-orange-500 w-full h-full">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className='text-sm items-center flex gap-1 absolute bottom-0 px-3 py-1 bg-orange-500 text-white p-0 border-2 border-white rounded-full'>
                              <Tag size={16}/>  Movie Actor
                            </span>
                        </div> 
                        <div className='flex gap-2 mt-4 flex-col justify-center items-center'>
                            <h3 className="text-3xl font-semibold text-center">Nate Bruzdzinski</h3>
                            <p className='text-sm text-gray-500 '>Creative Director • Brand Designer</p>
                            <span className="text-gray-600 flex gap-1 items-center text-sm"> <MapPin size={16}/> New York, NY</span>
                        </div>  
                        <div className='flex gap-6 mt-4 flex-col'>
                          <div className='flex gap-2 flex-col'>
                            <h3 className="font-semibold text-sm uppercase">Rate</h3>
                            <div className='flex text-sm'>
                              <div className='bg-orange-500/20 text-orange-500 px-4 py-1 rounded-full flex gap-3'> 
                                  <span>$50/hr</span>
                                  <span>-</span>
                                  <span>$75/hr</span>
                              </div>
                            </div>
                          </div>
                          <div className='flex gap-2 flex-col'>
                            <h3 className="font-semibold text-sm uppercase">Skills</h3>
                            <div className='flex '>
                              <div className='border text-gray-500 px-4 py-1 rounded-full flex gap-3'> 
                                  Movie acting
                              </div>
                            </div>
                          </div> 
                          <div className='flex gap-1 items-center'>
                            <div> 
                              <Languages size={20} />
                            </div>
                            <div>
                              English 
                            </div>
                          </div>
                        </div>
                      </div>  
                  </CardContent>
                </Card>
              </div>
              <div className='flex lg:w-[68%]'>
                <Card className="shadow-none border  border-gray-200 relative w-full">
                  <CardContent className="flex flex-col    p-6">
                    <Tabs defaultValue="profile" className="">
                        <TabsList className="gap-6 flex flex-wrap h-auto items-start justify-start pt-3 px-3">
                            <TabsTrigger value="profile" className="flex gap-2 items-center">
                              <UserPen size={16} />
                              <span className='lg:block hidden'>Profile</span>  
                            </TabsTrigger>
                            <TabsTrigger value="certificates_and_resume" title="Resume & Certificates" className="flex gap-2 items-center">
                              <FileUp size={16} />
                              <span className='lg:block hidden' >CV & Cert...</span>  
                            </TabsTrigger> 
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
                              <Badge>Verified</Badge>
                            </TabsTrigger> 
                        </TabsList>
                        <TabsContent value="profile" className="flex flex-col gap-6">
                            <GBasicInformation/>
                        </TabsContent>
                        <TabsContent value="certificates_and_resume">
                          <GCertificatesResume/>
                        </TabsContent>
                        <TabsContent value="media">  
                          <GMedia/>
                        </TabsContent>
                        <TabsContent value="hiring_request">  
                          <GHiringRequests/>
                        </TabsContent>
                        
                        <TabsContent value="recommendations">  
                          recommendations
                        </TabsContent>
                        
                        <TabsContent value="account">  
                          <GAccount/>
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
export default page;