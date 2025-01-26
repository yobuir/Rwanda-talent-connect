import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Decision from './Decision';
import moment from 'moment';

function User({data}) {
  return ( 
     <Card className="lg:w-auto w-full">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 justify-between">
            <div className='flex flex-row gap-4 justify-between items-center'> 
                <h2 className=" font-semibold">
                  {data?.talent?.fullName}
                  </h2>
                <div>
                    <Decision data={data}/>
                </div>
            </div>
            <hr/>
          </CardTitle>
        </CardHeader>
      <CardContent> 
        <div className='w-full'> 
            <div className="flex flex-col items-center"> 
              <p className="text-gray-500"> {data?.talent?.headline}</p>
              <p className="text-gray-500"> {data?.talent?.bio}</p>
              <p className="text-gray-500 text-sm mt-1">{data?.talent?.address}</p>
            </div> 

            <div className="text-center mt-4"> 
              <p className="text-sm text-gray-500">Member since   {moment(data?.talent?.createdAt, "YYYYMMDD").fromNow()} </p>
            </div> 
        </div>
      </CardContent>
    </Card>
  )
}

export default User