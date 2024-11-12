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
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    }, 
    {
      id: "72d52f",
      amount: 200,
      status: "paid",
      email: "Hello@example.com",
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
                <BreadcrumbPage>Transactions</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
            <div className='flex-1'>
                <h1 className='text-2xl font-bold'>
                    Transactions
                </h1>
                <p className='text-gray-500'>List of transaction histories</p>
            </div>
            <div className="">
                <DataTable columns={columns} data={data} />
            </div>
        </div>

    )
}

export default page