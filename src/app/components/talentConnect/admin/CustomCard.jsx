import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
function CustomCard({ title,description,link,total }) {
  return (  
       <Card className='shadow-sm'>
          <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription> {description} </CardDescription>
          </CardHeader>
          <CardContent> 
            <div className='flex flex-col space-y-4'>
            <div className="text-2xl font-bold">{total}</div>
            <Link href={link} className="flex gap-2 border-t pt-3  leading-none">
              View All
              </Link> 
            </div> 
          </CardContent> 
        </Card>  
  )
}

export default CustomCard