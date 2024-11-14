import React from 'react'
import { Card, CardContent } from "@/components/ui/card" 
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {  MapPin, Tag } from 'lucide-react'
import Link from 'next/link'


function TalentCard() {
  return (
     <Card className="shadow-none border relative border-gray-200 hover:shadow-lg ">
        <span className='flex text-sm items-center font-semibold gap-1 absolute top-0 left-0 px-3 py-1 text-orange-500 p-0 border-2 border-white rounded-lg'>
          90%
        </span>
        <CardContent className="flex flex-col justify-center items-center  p-6"> 
            <Link href='talents/1' className='relative flex justify-center items-center bg-orange-400 rounded-full w-40 h-40 mr-4'>  
                <Avatar className="rounded-full w-full h-full">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className='text-sm items-center flex gap-1 absolute bottom-0 px-3 py-1 bg-orange-500 text-white p-0 border-2 border-white rounded-full'>
                  <Tag size={16}/>  Movie Actor
                </span>
            </Link> 
            <Link href={''} className='flex flex-col justify-center items-center'>
                <h3 className="text-lg font-semibold text-center">Nate Bruzdzinski</h3>
                <p className='text-sm text-gray-500 '>Creative Director • Brand Designer</p>
                <span className="text-gray-600 flex gap-1 items-center text-sm"> <MapPin size={16}/> New York, NY</span>
            </Link>        
        </CardContent>
    </Card> 
  )
}

export default TalentCard