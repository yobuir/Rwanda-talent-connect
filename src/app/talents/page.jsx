'use client';
import React from 'react';
import NavBar from '../components/Header/NavBar';
import TalentsPopular from './components/TalentsPopular';
import TalentCard from './components/TalentCard';
import { Star } from 'lucide-react';
import Filtering from './components/Filtering'; 

function page() {
  return ( 
      <div className='relative bg-white'>
        <NavBar/>
        <div className='flex flex-col lg:flex-row gap-3'>
          <div className="min-h-screen px-12 mx-auto lg:w-[80%]">
            <div className="flex flex-col  gap-4 max-w-[100%] mx-auto mb-10">
              <div className='flex lg:justify-between lg:flex-row flex-col  gap-6 lg:items-center'>
                <div className='flex flex-col '>
                  <div className='flex'>
                      <div className="bg-orange-500/20 px-4 flex items-center gap-1 py-2 text-orange-500 rounded-full   mb-4">
                      <Star className="h-4 w-4 " />
                      Top Ranked Talents</div>
                  </div>
                  <div className="text-gray-500 text-sm lg:block hidden ">
                      Check out the most popular talents in the community right now and find the perfect match for your project.
                  </div>
                </div> 
              </div>
              <TalentsPopular/>
            </div>
            <main className="">   
                <div className="flex flex-wrap gap-4 mb-8">
                    <button   className="px-4 py-2 bg-orange-500 text-white rounded-full text-sm">All</button> 
                    <button  className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm hover:bg-orange-500 hover:text-white cursor-pointer">Video vixens</button> 
                    <button   className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm hover:bg-orange-500 hover:text-white cursor-pointer">Movie actors</button>
                    <button   className="px-4 py-2 bg-orange-500/20 text-orange-500 rounded-full text-sm hover:bg-orange-500 hover:text-white cursor-pointer">Movie actresses</button>
                </div> 
                <div className='flex '>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <TalentCard/>
                      <TalentCard/>
                      <TalentCard/>
                      <TalentCard/>
                      <TalentCard/>
                      <TalentCard/>
                    </div> 
                </div> 
            </main>
          </div>
          <div className='order-first  lg:order-last '>
          <Filtering/>
          </div>
        </div>
        
      </div>
  );
}
export default page;