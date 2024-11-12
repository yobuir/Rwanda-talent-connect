import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
function CustomCard() {
  return (  
       <Card className='shadow-sm'>
          <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription> All system users  </CardDescription>
          </CardHeader>
          <CardContent> 
            <div className='flex flex-col space-y-4'>
            <div className="text-2xl font-bold">1,207</div>
            <Link href="" className="flex gap-2 border-t pt-3  leading-none">
              View All
              </Link> 
            </div> 
          </CardContent> 
        </Card>  
  )
}

export default CustomCard