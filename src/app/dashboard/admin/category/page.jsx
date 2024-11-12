"use client" 
import Link from 'next/link'
import React from 'react'
import { columns } from './columns'
import { DataTable } from './data-table'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

function page() {

    const data =
    [
    {
      id: "1",
      name: "Video vixens",
      status: "pending",
      users:144,
    },
    {
      id: "2",
      name: "Movie actors and actresses",
      status: "pending",
      users:14,
    }, 
  ]
    return (
        <div className='flex flex-1  flex-col gap-4 p-4 w-full'>
           <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <Link href="/dashboard/admin">
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Category</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <div className='flex-1'>
                <h1 className='text-2xl font-bold'>
                    Category
                </h1>
                <p className='text-gray-500'>List, manage and delete all categories</p>
            </div>
            <div className="">
                <DataTable columns={columns} data={data} />
            </div>
        </div>

    )
}

export default page