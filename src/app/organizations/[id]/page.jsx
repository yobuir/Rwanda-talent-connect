'use client';
import React, { useEffect, useState } from 'react';  
import { Building, Calendar,MessageSquareWarning,Users, Vote } from 'lucide-react'; 
import NavBar from '@/app/components/Header/NavBar';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';  
import { Badge } from '@/components/ui/badge';   
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import PendingProfile from '@/app/talents/[id]/components/HiringRequest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input'; 
import { useSession } from 'next-auth/react';
import CompanyProfile from '../components/CompanyProfile';
import CompanyUpdate from '../components/CompanyUpdate';
import { getCompany } from '@/utils/companies/client/getCompany'; 
import Skeleton from 'react-loading-skeleton';
import CompanyDelete from '../components/CompanyDelete';
import NotFound from '@/app/not-found';
function page({ params }) { 
  const [companyId, setCompanyId] = useState();
  const [company, setCompany] = useState(null);

    useEffect(() => { 
        async function fetchParams() {
        const resolvedParams = await params;  
            setCompanyId(resolvedParams.id);  
            }
          fetchParams();
      }, [params]);
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);


    const fetchCompany = async () => {
      setLoading(true);
      try {
        const fetchedCompany = await getCompany(companyId);
        setCompany(fetchedCompany || {}); 
      } catch (error) { 
        toast({
          variant: 'destructive',
          title: 'Error fetching company',
          description: error.message || 'Unable to fetch company details. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if (companyId) {
        fetchCompany();
      }
    }, [companyId]);

if(company?.code == 404){
  return (
    <>
      <NotFound/>
    </>
  )
}

if(company?.status != 'active'){
  return (
    <div className='flex min-h-screen justify-center items-center '>
      <div>
        <h1>We're currently verifying your company information and will be available soon .</h1>
      </div>
    </div>
  )
}
  return ( 
      <div className='relative bg-white'>
        <NavBar />
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className=" lg:px-12 p-2 pt-0 lg:max-w-7xl w-full mt-0 lg:mx-auto lg:min-w-[80%]  flex flex-col gap-6">
            <div className='flex lg:flex-row flex-col flex-wrap gap-4 mt-0 pt-0'>
              <CompanyProfile user={session?.user} company={company} loading={loading} />
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
                        <TabsList className="gap-6  flex flex-wrap h-auto items-start justify-start pt-3 px-3">
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
                            <TabsTrigger value="company_deletion" className="flex gap-2 items-center">
                              <span className='lg:block hidden'>Settings</span>  
                              <Badge variant={`destructive`}>Danger</Badge>
                            </TabsTrigger> 
                        </TabsList>
                        <TabsContent value="profile" className="flex flex-col gap-6">
                          <Card className="shadow-none border border-dashed   border-gray-200 relative ">
                            <CardContent>  
                                <div className='flex gap-2 items-center pt-4'>
                                    <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                                    Company information
                                    </h3>
                                </div> 
                                {loading ? (
                                  <Skeleton height={25} width="100%" count={2} />
                                ) : 
                                (
                                  <CompanyUpdate  user={session?.user} company={company} loading={loading} />
                                )
                                }
                            </CardContent>
                          </Card>   
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
                        <TabsContent value="company_deletion">  
                          <Card className="shadow-none border border-dashed   border-gray-200 relative ">
                            <CardContent>  
                                <div className='flex mb-4 gap-2 items-center pt-4'>
                                    <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                                    Danger zone
                                    </h3>
                                </div> 
                                {loading ? (
                                  <Skeleton height={25} width="100%" count={2} />
                                ) : 
                                (
                                  <CompanyDelete  user={session?.user} company={company} loading={loading} />
                                )
                                }
                            </CardContent>
                          </Card> 
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