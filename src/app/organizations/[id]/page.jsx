'use client';
import React, { useState } from 'react';  
import { Building, Calendar, ChevronLeft, LockKeyholeIcon, MapPin, MessageSquareWarning, Tag, Terminal, UserPen, Users, Vote } from 'lucide-react'; 
import NavBar from '@/app/components/Header/NavBar';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';  
import { Badge } from '@/components/ui/badge';   
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CustomFileUpload from '@/app/components/CustomFileUpload';
import { Button } from '@/components/ui/button';
import PendingProfile from '@/app/talents/[id]/components/HiringRequest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

function page() {
   const [gender, setGender] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState(''); 
  return ( 
      <div className='relative bg-white'>
        <NavBar/>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className=" lg:px-12 p-2 pt-0 lg:max-w-7xl w-full mt-0 lg:mx-auto lg:min-w-[80%]  flex flex-col gap-6">
            <div className='flex lg:flex-row flex-col flex-wrap gap-4 mt-0 pt-0'>
              <div className='flex flex-col lg:max-w-7xl w-full  mt-0 pt-0'>
                  <Link href='/dashboard' className='lg:hidden flex gap-2 mb-5 lg:text-orange-50 items-center'>
                    <span className='text-orange-500 bg-orange-200 p-2 rounded-full hover:bg-orange-500 hover:text-white '>
                      <ChevronLeft size={26} />
                    </span>
                    <span className='text-xl font-semibold'>Nate Bruzdzinski</span>
                  </Link>
                <Card className="shadow-none lg:flex hidden border  flex-col w-full border-gray-200 relative bg-[url('/images/companyDefault.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-b before:rounded-lg after:rounded-lg before:from-orange-500/20 before:via-transparent before:to-orange-500/40 after:absolute after:inset-0 after:bg-gradient-to-t after:from-orange-500/40 after:via-transparent after:to-orange-500/40 before:z-[1] after:z-[1] h-52 rounded-lg">
                  <CardHeader className="relative z-10">
                    <Link href='/dashboard' className='flex gap-2 text-orange-50 items-center'>
                      <span className='text-orange-50 bg-orange-50/20 p-2 rounded-full hover:bg-orange-500 hover:text-white '>
                        <ChevronLeft size={26} />
                      </span>
                      <span className='text-xl font-semibold'>Nate Bruzdzinski</span>
                    </Link>
                  </CardHeader>
                </Card>
                <div className='relative lg:w-auto w-full'>
                <Card className="lg:absolute lg:w-auto w-full  top-16 z-20 right-0 transform lg:-translate-x-1/4 lg:-translate-y-1/2 shadow-none "> 
                  <CardContent className="flex  flex-col justify-center items-center p-6 relative z-10">
                    <div className='px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg flex justify-center items-center flex-col'>
                      <div className='relative flex justify-center items-center bg-orange-400 rounded-full w-28 h-28'>  
                        <Avatar className="rounded-full border-2 border-orange-500 w-full h-full">
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar> 
                      </div> 
                      <div className='flex gap-2 mt-4 flex-col justify-center items-center'>
                        <h3 className="text-3xl font-semibold text-center">Nate Bruzdzinski</h3>
                        <p className='text-sm text-gray-500'>Creative Director • Brand Designer</p>
                        <span className="text-gray-600 flex gap-1 items-center text-sm">
                          <MapPin size={16}/> New York, NY
                        </span>
                      </div>  
                    </div>  
                  </CardContent>
                </Card>
                </div>
              
              </div> 
              <div className='flex flex-col gap-4  w-full'>
                <div className='lg:flex hidden flex-col gap-3 lg:w-[67%] '>
                  <Alert>
                    <MessageSquareWarning className="h-4 w-4" />
                    <AlertTitle>Events!</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2"> 
                      Did you know that you can create events for your company ? 
                      <Link href='/dashboard/events' className='text-orange-500 font-semibold'>
                      Click here to create an event
                      </Link>
                    </AlertDescription>
                  </Alert>
                  <Alert>
                    <MessageSquareWarning className="h-4 w-4" />
                    <AlertTitle>Voting!</AlertTitle>
                    <AlertDescription className="flex flex-col gap-2">
                      Did you know that you can setup  voting event for free ? 
                      <Link href='/dashboard/events' className='text-orange-500 font-semibold'>
                      Click here to start voting  
                      </Link>
                    </AlertDescription>
                  </Alert>
                </div>

                <Card className="shadow-none border  border-gray-200 relative w-full">
                  <CardContent className="flex flex-col p-6">
                    <Tabs defaultValue="profile" className="">
                        <TabsList className="gap-6">
                            <TabsTrigger value="profile" className="flex gap-2 items-center">
                              <Building size={16} />
                              <span className='lg:block hidden'>About</span>  
                            </TabsTrigger>
                            <TabsTrigger value="talents" className="flex gap-2 items-center">
                              <Users size={16} />
                              <span className='lg:block hidden'>Talents</span>  
                            </TabsTrigger> 
                            <TabsTrigger value="org_company" className="flex gap-2 items-center">
                              <Link href={'/dashboard/events'} className="flex gap-2 items-center">
                                <Calendar size={16} />
                                <span className='lg:block hidden'>Events</span>
                                </Link>
                            </TabsTrigger> 
                            <TabsTrigger value="org_company" className="flex gap-2 items-center">
                              <Link href={'/dashboard/events'} className="flex gap-2 items-center">
                                <Vote size={16} />
                                <span className='lg:block hidden'>Voting</span>
                                </Link> 
                            </TabsTrigger> 
                            <TabsTrigger value="account" className="flex gap-2 items-center">
                              <span className='lg:block hidden'>Status</span>  
                              <Badge>Verified</Badge>
                            </TabsTrigger> 
                        </TabsList>
                        <TabsContent value="profile" className="flex flex-col gap-6">
                          <div className='flex gap-2 items-center'>
                              <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                              Company information
                              </h3>
                          </div> 
                          <div className='flex flex-col gap-4'> 
                              <div className="grid grid-cols-1 items-center gap-4">
                                  <Label htmlFor="headline" className="text-left">
                                      What is your company name
                                  </Label>
                                  <Input id="company_name"  placeholder="Enter company name" onChange={(e) => setHeadline(e.target.value)}  className="col-span-1" />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-4">
                                  <Label htmlFor="location" className="text-left">
                                      What is your company location
                                  </Label>
                                  <Input id="location"  placeholder="Enter company location" onChange={(e) => setHeadline(e.target.value)}  className="col-span-1" />
                              </div>
                              
                              <div className="grid grid-cols-1 items-center gap-4">
                                  <Label htmlFor="headline" className="text-left">
                                      Upload company logo
                                  </Label>
                                  <CustomFileUpload />
                              </div>
                              <div className="grid grid-cols-1 items-center gap-4">
                                  <Label htmlFor="bio" className="text-left">
                                      What is your company description (optional)            
                                  </Label>
                                  <Textarea id="bio" rows={6} onChange={(e) => setBio(e.target.value)} placeholder="Write a few sentences about yourself" className="col-span-3"></Textarea>
                              </div>
                              
                              <div className="flex   gap-4">
                                  <Button>
                                      Save 
                                  </Button>   
                              </div>
                          </div>  
                        </TabsContent>
                        <TabsContent value="talents">
                            <CardTitle className='shadow-sm'>
                            <CardHeader>
                                <CardTitle>
                                    <div className='flex justify-between'>
                                        <p className='font-bold text-sm'>All Talents</p>
                                    </div>
                                </CardTitle>
                                <CardDescription> All talents in your company </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className='flex flex-col space-y-4'>
                                    <div className='flex justify-between gap-3'>
                                        <div className='flex-1'>
                                            <Input placeholder="Search" />
                                        </div>
                                        <div>
                                        <Select>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                                <SelectItem value="system">System</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        </div>
                                    </div>
                                    <PendingProfile />
                                    <PendingProfile />
                                    <PendingProfile />
                                </div>
                            </CardContent>
                        </CardTitle>
                        </TabsContent> 
                        <TabsContent value="account">  
                            <Badge>Verified</Badge>
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