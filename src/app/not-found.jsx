import Link from 'next/link';
import React from 'react';
import NavBar from './components/Header/NavBar';

function NotFound() {
  return (
    <div>
      <NavBar/>
        <div className='flex flex-col gap-6 justify-center items-center min-h-[60vh]'>
          <h1 className="text-4xl text-orange-500 font-extrabold sm:text-5xl">
              Rwanda Talent Connect
          </h1>
          <h5 className='text-2xl font-bold'>Not Found</h5>
          <Link className='text-orange-500' href='/'>Back home</Link>
      </div>
    </div>
  
  );
}

export default NotFound;
