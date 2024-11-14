'use client';

import React, { useEffect, useState } from 'react'; 
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronLeft,MapPin } from 'lucide-react';
import Link from 'next/link'; 
import Skeleton from 'react-loading-skeleton';

import Image from 'next/image';
import moment from 'moment';

function CompanyProfile({company,loading}) { 

  return (
    <div className="flex flex-col lg:max-w-7xl w-full mt-0 pt-0">
      {/* Back Link */}
      <Link href="/dashboard" className="lg:hidden flex gap-2 mb-5 lg:text-orange-50 items-center">
        <span className="text-orange-500 bg-orange-200 p-2 rounded-full hover:bg-orange-500 hover:text-white">
          <ChevronLeft size={26} />
        </span>
        <span className="text-xl font-semibold">Dashboard</span>
      </Link>

      {/* Header Card */}
      <Card className="shadow-none lg:flex hidden border flex-col w-full border-gray-200 relative bg-[url('/images/companyDefault.jpg')] bg-cover bg-center bg-no-repeat before:absolute before:inset-0 before:bg-gradient-to-b before:rounded-lg after:rounded-lg before:from-orange-500/20 before:via-transparent before:to-orange-500/40 after:absolute after:inset-0 after:bg-gradient-to-t after:from-orange-500/40 after:via-transparent after:to-orange-500/40 before:z-[1] after:z-[1] h-52 rounded-lg">
        <CardHeader className="relative z-10">
          <Link href="/dashboard" className="flex gap-2 text-orange-50 items-center">
            <span className="text-orange-50 bg-orange-50/20 p-2 rounded-full hover:bg-orange-500 hover:text-white">
              <ChevronLeft size={26} />
            </span>
            <span className="text-xl font-semibold">Dashboard</span>
          </Link>
        </CardHeader>
      </Card>

      {/* Profile Content */}
      <div className="relative lg:w-auto w-full ">
        <Card className="lg:absolute lg:w-auto w-full top-16 overflow-auto z-20 right-0 transform lg:-translate-x-1/4 lg:-translate-y-1/2 shadow-none lg:max-w-72 lg:min-w-72 lg:h-[300px]">
        <CardContent className="flex flex-col justify-center items-center p-6 relative z-10">
            {loading ? (
                <>
                <Skeleton circle height={112} width={112} /> 
                <Skeleton height={25} width={'100%'} count={2} /> 
                </>

            ) : (
            <div className="px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg flex justify-center items-center flex-col">
                <div className="relative flex justify-center items-center w-full">
                    <Image src={company?.logo ?? 'https://placehold.co/400'} alt={company?.companyName || 'Company Logo'} height={200} width={200} />
                </div>
                <div className="flex gap-2 mt-4  flex-col justify-center items-center">
                    <h3 className="text-2xl font-semibold text-center">{company?.companyName || 'Company'}</h3> 
                    <span className="text-gray-600 flex gap-1 items-center text-sm">
                        {company?.address? <MapPin size={16}/>: ''} {company?.address}
                    </span>
                    <span className='flex items-center gap-2'>
                      Registered. {moment(company?.createdAt, "YYYYMMDD").fromNow()}
                    </span>
                </div>
            </div>
            )}
        </CardContent>
        </Card>
    </div>
    </div>
    );
}

export default CompanyProfile;
