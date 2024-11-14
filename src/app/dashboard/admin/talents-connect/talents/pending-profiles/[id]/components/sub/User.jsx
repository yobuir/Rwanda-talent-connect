import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Decision from './Decision';

function User() {
  return ( 
     <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 justify-between">
            <div className='flex flex-row gap-4 justify-between items-center'> 
                <h2 className=" font-semibold">Iradukunda Yobu</h2>
                <div>
                    <Decision/>
                </div>
            </div>
            <hr/>
          </CardTitle>
        </CardHeader>
      <CardContent> 
        <div className='w-full'> 
                <div className="flex flex-col items-center"> 
                <p className="text-gray-400">Software Developer</p>
                <p className="text-gray-400 text-sm mt-1">Kigali, Rwanda</p>
                </div> 

                <div className="text-center mt-4">
                <p className="text-sm text-gray-400">Last seen just now</p>
                <p className="text-sm text-gray-400">Member since July 10, 2023</p>
                </div>

            </div>
      </CardContent>
        </Card>
  )
}

export default User