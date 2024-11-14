'use client';

import Image from "next/image";
import Link from "next/link";
import NavBar from "./components/Header/NavBar"; 
import { ArrowRight, ChevronRight, Video } from "lucide-react";
import { Card, CardFooter } from "@/components/ui/card";

export default function Home() {
  return (
    <>
    <div className='relative min-h-screen '> 
      {/* <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/intro.mp4" type="video/mp4" />
      </video> */}

      {/* Overlay Gradient */}
      {/* <div className='absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-gray-900/70 z-10'></div> */}

      {/* Page Content */}
      <div className='relative'>
        <NavBar/>
        <section>
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12   overflow-hidden md:px-8 flex flex-col items-center justify-center">
            
            <div className='flex-none space-y-5 max-w-2xl text-center'>
              
          
              <h1 className="text-4xl text-orange-500 font-extrabold sm:text-5xl">
                Rwanda Talent Connect
              </h1>
              <h2 className="text-lg font-bold flex items-center justify-center"> 
                Find & Hire the Best <span className="text-orange-600 ml-1">Video Vixens</span> & <span className="text-orange-600 ml-1">Actors/Actresses</span>
              </h2>
              <p>
                Welcome to Rwanda.TC, your gateway to the vibrant world of talent in Rwanda.
              </p>
            <div className="flex flex-col gap-8 lg:flex-row items-center justify-center">
              
              <Card className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-xl border text-gray-600 ">
                <span className="text-orange-600 font-semibold">Rwanda Talent Connect</span> connects clients with top talent in the entertainment industry. Whether you&lsquo;re looking for a video vixen or an actor, we make finding and hiring talent easy and efficient.
              
              </Card>
              <Card className="backdrop-blur-md bg-white/10 p-6 rounded-lg shadow-xl border  text-gray-600">
                Are you passionate about acting or working as a video vixen? We&lsquo;re looking for dedicated individuals who want to make a career out of it.
              </Card>
              </div>
              <div className="flex flex-col gap-4 lg:flex-row items-center justify-center">
                <Link href="/auth/register" className="text-white font-semibold flex  gap-2
                  hover:bg-orange-600 bg-orange-500  rounded-lg p-2 px-6   justify-between items-center">
                  <span>Get Started </span>
                  <ChevronRight />
                  </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div> 
    </>
  );
}
