import CustomAvatar from '@/app/components/talentConnect/CustomAvatar';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Drawer, 
  DrawerContent,
  DrawerDescription, 
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Employer from './Employer';
import Message from './Message';
import User from './User';


function RequestCard() {
  return (
    <div className='flex flex-col gap-2'>
        <div  className='flex flex-row gap-2 items-center justify-between border-b pb-3 '>
            <div className='flex flex-row gap-2 items-center'>
            <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
            <CustomAvatar/>
            </div>
            <div className='flex flex-col'>
                <h5>Yobu Iradukunda </h5>
                <span className='text-xs text-orange-500'>Requested. 4 days ago</span>
            </div>
            </div>
            <div className='flex flex-row gap-2 items-center'>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="outline">View more</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mx-auto w-full lg:max-w-[80%] h-[90vh]  lg:pt-28 overflow-auto flex flex-col justify-center items-center">
                        <DrawerHeader className={"flex flex-col gap-2 text-center w-full"}>
                            <DrawerTitle className="flex justify-center items-center">Hiring request</DrawerTitle>
                            <DrawerDescription className="flex justify-center items-center">Hiring Requested sent. 4 days ago.</DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0 flex  lg:flex-row flex-col gap-4 justify-between items-center w-full"> 
                            <div className='flex flex-col gap-2 min-w-[300px]'>
                                <User/>   
                                <Employer/> 
                            </div>
                                <Message/> 
                            </div> 
                        </div>
                </DrawerContent>
                </Drawer>
            </div>
        </div>
    </div>
  );
}

export default RequestCard;
