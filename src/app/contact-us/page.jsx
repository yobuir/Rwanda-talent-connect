'use client';
import React from 'react'; 
import NavBar from '../components/Header/NavBar'; 
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function page() {
  return ( 
      <div className='relative bg-white'>
        <NavBar/>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className="min-h-screen px-12 mx-auto lg:w-[80%]">
              <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">Contact us</h2>
              <p className="mt-2 text-lg/8 text-gray-600">We&apos;ll get back to you as soon as possible .</p>
            </div>
            <form action="#" method="POST" className="mx-auto mt-16 max-w-xl sm:mt-20">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-1">
                <div>
                  <Label htmlFor="name" className="">Name</Label>
                  <div className="mt-2.5">
                    <Input type="text" name="name" id="name" autoComplete="name" className="block w-full "/>
                  </div>
                </div>  
                <div className="sm:col-span-2">
                  <Label htmlFor="email" className="">Email</Label>
                  <div className="mt-2.5">
                    <Input type="email" name="email" id="email" autoComplete="email" className="block w-full "/>
                  </div>
                </div> 
                <div className="sm:col-span-2">
                  <Label htmlFor="message" className="">Message</Label>
                  <div className="mt-2.5">
                    <Textarea name="message" id="message" rows="4" className="block w-full "></Textarea>
                  </div>
                </div> 
              </div>
              <div className="mt-10">
                <Button type="submit" className="block w-full  ">Let's talk</Button>
              </div>
            </form>
          </div>
        
        </div>
  
      </div>
  );
}
export default page;