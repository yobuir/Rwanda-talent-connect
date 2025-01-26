"use client"
import React, { useEffect, useState } from 'react' 
import Link from 'next/link' 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import CustomCard from '@/app/components/talentConnect/admin/CustomCard'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DataTable } from './data-table'
import { columns } from './columns'  
import { fetchTalentRequests } from '@/utils/admin/talents/requests/getRequests'

function Page() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0); 

  useEffect(() => {
    async function loadData() {
        const { talents,total } = await fetchTalentRequests(page, pageSize); 
        setData(talents);  
        setTotal(total);
    }
    loadData();
  }, [page, pageSize]); 


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
                <BreadcrumbPage>All  requests</BreadcrumbPage>
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
                                            <p className='font-bold text-sm'>All hiring requests</p>
                                        </div>
                                    </CardTitle>
                                    <CardDescription> All hiring requests received </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <DataTable columns={columns} data={data} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize} total={total} />
                                </CardContent>
                            </Card>
                        </div>
                    </div> 
                </div>
                <div className='grid grid-cols-1 gap-4 flex-wrap'>
                    <div className='flex flex-1 flex-col gap-4   w-full'>
                        <CustomCard total={total} title="Requests"  description="All  hiring requests " link="/"  /> 
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default Page