import React from 'react';
import NavBar from '../components/Header/NavBar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronDown, CirclePlus, Eye } from 'lucide-react';  
import CompanyProfile from './components/CompanyProfile'; 
function page() {
  return ( 
      <div className='relative bg-white'>
        <NavBar/> ;

            <div className='flex flex-col lg:flex-row gap-3'>
            <div className=" lg:px-12 p-2 lg:max-w-7xl w-full lg:mx-auto lg:min-w-[80%]  flex flex-col gap-6">
                <div className='flex  gap-2 w-full lg:flex-row flex-col  lg:justify-between lg:items-center'>
                    <h1 className='text-2xl font-semibold'>
                        <span className='text-orange-500'>Welcome to Rwanda.TC </span>  
                        , Yobu Iradukunda</h1>
                        <Link href={'/dashboard/client/1'} className='flex flex-row gap-2 items-center font-bold underline hover:text-orange-500'>
                        My profile
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <Link href={''} className='flex flex-col gap-2'>
                        <Card className='flex flex-col gap-2 bg-gray-50 shadow-none border  hover:shadow border-dashed   border-gray-200 relative '>
                            <CardHeader>
                                <CardTitle className='flex flex-row gap-2 justify-between'>
                                    <h1 className='text-xl font-semibold text-gray-600 flex items-center gap-1'>
                                        <ChevronDown/>    My Talents
                                    </h1>
                                    <div>
                                    <span className='text-orange-500 flex gap-2 items-center'>
                                        <Eye/>
                                        View All</span>
                                    </div>
                                </CardTitle>
                            </CardHeader> 
                            <CardContent>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex flex-row gap-2'>
                                        <span className='text-orange-500'>0</span>
                                        Video Vixens
                                    </div>
                                    <div className='flex flex-row gap-2'>
                                        <span className='text-orange-500'>0</span>
                                        Actors/Actresses
                                    </div>
                                </div> 
                            </CardContent>
                        </Card>
                    </Link>
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col gap-2'>
                        <Card className='flex flex-col gap-2 shadow-none   hover:shadow  border border-dashed bg-gray-50  border-gray-200 relative  cursor-pointer'>
                            <CardHeader>
                                <CardTitle className='flex flex-row gap-2 justify-between'>
                                    <h1 className='text-xl font-semibold text-gray-600 flex items-center gap-1'>
                                        <ChevronDown/>    My Organizations (1)
                                    </h1>
                                    <Link href={'/dashboard/client/1'}>
                                    <span className='text-orange-500 flex gap-2 items-center'>
                                        <CirclePlus/>
                                        Add more</span>
                                    </Link>
                                </CardTitle>
                            </CardHeader> 
                            <CardContent>
                                <div className='flex flex-col gap-2'>
                                    <CompanyProfile/>
                                </div> 
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
