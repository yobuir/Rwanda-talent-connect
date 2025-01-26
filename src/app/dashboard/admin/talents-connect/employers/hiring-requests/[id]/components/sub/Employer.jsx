'use client';
import { DataTable } from '@/app/dashboard/admin/category/data-table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

function Employer({data}) {  
  return (
    <Card className="lg:w-auto w-full">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 justify-between">
            <h2 className=" font-semibold">Employer Profile</h2>
            <hr/>
          </CardTitle>
        </CardHeader>
      <CardContent> 
          <div className=" text-sm flex flex-col gap-2 text-gray-500">
            <p><strong>Company:</strong> {data?.company?.companyName}</p>
            <p><strong>Location:</strong> {data?.company?.address}</p>
            <p>{data?.company?.activityDescription} </p>
          </div>
      </CardContent>
        </Card>
  );
}

export default Employer;
