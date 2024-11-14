import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card" 
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tag } from 'lucide-react';
import Link from 'next/link';
function TalentsPopular() {
    return (
        <div className="lg:max-w-[100%]   ">
            <div  className="flex">
                <div className="p-1">
                    <Card className="shadow-none border-none rounded-full ">
                        <Link href='/talents/1' className='relative flex justify-center items-center bg-orange-400 rounded-full  w-[140px] h-[140px]'> 
                            <Avatar className="rounded-full w-full h-full">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className='text-xs items-center  gap-1 absolute bottom-0 px-3 py-1 bg-orange-500 hidden lg:flex text-white p-0 border-2 border-white rounded-full'>
                            <Tag size={16}/>  Movie Actor
                            </span>
                        </Link> 
                    </Card>
                </div>
            </div> 
        </div> 
    );
}

export default TalentsPopular;