"use client" 
import Link from 'next/link'
import React from 'react'
import { Columns } from './columns'
import { DataTable } from './data-table'
import CategoryNew from './Components/CategoryNew';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getCategories } from '@/utils/admin/categories/getAll'
import { useEffect } from 'react'
import { useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'

function Page() {

  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [metadata, setMetadata] = useState({});

  const loadCategories = async (page = 1, limit = 10) => {
    try {
      const data = await getCategories(page, limit);
      setCategories(data.categories || []);
      setMetadata(data.metadata || {});
    } catch (error) { 
      toast({
        variant: 'destructive',
        title: 'Verification Failed',
        description: error?.error?.message || 'An error occurred while resetting your password.',
      });
    }
  };

  useEffect(() => {
    loadCategories(page, limit);
  }, [page, limit]); 

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
        <DataTable columns={Columns(() => loadCategories(page, limit))} data={categories} />
      </div>
      <div className="flex justify-right items-end gap-3  w-full">
        <div className='flex justify-between border rounded-lg items-center gap-3 font-semibold'>
          <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}  variant="outline" size="sm">
            Previous
          </Button> 
          <span>Page {page} of {metadata.totalPages || 1}</span>
          <Button onClick={() => setPage((prev) => (metadata.totalPages ? Math.min(prev + 1, metadata.totalPages) : prev + 1))} disabled={page === metadata.totalPages} variant="outline" size="sm">
            Next
          </Button>
        </div>        
      </div>
    </div>

  )
}

export default Page