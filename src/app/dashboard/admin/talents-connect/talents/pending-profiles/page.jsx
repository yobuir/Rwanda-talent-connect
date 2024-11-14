"use client"
import React from 'react'
import Charts from '@/app/components/talentConnect/admin/Charts'
import CustomCard from '@/app/components/talentConnect/admin/CustomCard'  
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PendingProfile from './PendingProfile'
import { Input } from '@/components/ui/input' 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function Page() {
    return (
        <div className='flex flex-col gap-3'>
             <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link href="/dashboard/admin">
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
               <BreadcrumbItem className="hidden md:block">
                <Link href="/dashboard/admin/talents">
                  Talents
                </Link>
              </BreadcrumbItem>
              
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Pending Talents</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
             <div className='flex flex-1 lg:flex-row flex-col gap-4  w-full'>
            <div className='flex-1'>
                <div className='flex flex-1 flex-col gap-4 w-full'>
                    <div className='flex flex-1 flex-col gap-4 w-full'>
                        <Card className='shadow-sm'>
                            <CardHeader>
                                <CardTitle>
                                    <div className='flex justify-between'>
                                        <p className='font-bold text-sm'>All Pending verifications</p>
                                    </div>
                                </CardTitle>
                                <CardDescription> Pending users for verification </CardDescription>
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
                        </Card>
                    </div>
                </div> 
            </div>
            <div className='grid grid-cols-1 gap-4 flex-wrap'>
                <div className='flex flex-1 flex-col gap-4   w-full'>
                    <CustomCard /> 
                </div> 
                <div className='flex flex-1 flex-col  w-full'>
                    <Charts />
                </div>  
            </div>
        </div>
        </div>
     
    )
}

export default Page