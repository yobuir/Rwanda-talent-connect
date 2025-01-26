'use client'
import React, { useState,useEffect } from 'react'
import CustomAvatar from '@/app/components/talentConnect/CustomAvatar';
import Employer from './components/sub/Employer';
import Message from './components/sub/Message';
import User from './components/sub/User'; 
import { fetchTalentRequestBId } from '@/utils/admin/talents/requests/getRequestById';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';

function Page({ params }) { 
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [requestId, setRequestId] = useState('');

    useEffect(() => { 
        setLoading(true);
            async function fetchParams() {
            const resolvedParams = await params;   
                
            setRequestId(resolvedParams.id);
                }
    
            fetchParams().finally(() => setLoading(false));
        }, [params]);
    
        console.log(requestId)

    useEffect(() => { 
        async function loadData() {
            try {
                if(!requestId) return;

                setLoading(true);
                const { talents,total } = await fetchTalentRequestBId(requestId); 
                setData(talents);  
            } catch (error) {
                console.log(error);
            }
        }
        loadData().finally(() => setLoading(false));;
    }, [requestId]); 
    
console.log(data)
return (
    <div>
        <div className='flex flex-col gap-2'>
            <div  className='flex flex-col gap-2  border-b '>
                <div className='flex flex-row gap-2 justify-between items-center'>
                    <div className='flex flex-row gap-2 items-center'>
                        <div className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                            <CustomAvatar name={data?.talent?.fullName} image={data?.talent?.image}/>
                        </div>
                        <div className='flex flex-col'>
                            <h5>{data?.talent?.fullName} </h5>
                            <span className='text-xs text-orange-500'>Requested.  
                                {moment(data?.createdAt, "YYYYMMDD").fromNow()}
                            </span>
                        </div>
                    </div>
                    <Badge>
                        {data?.status}
                    </Badge>
                </div>
                <div>
                    {
                        data?.rejectionReason && (
                            <div className='text-red-500 bg-red-500/10 font-bold p-2 rounded px-4 mt-5 text-sm'>Rejection reason: {data?.rejectionReason}</div>
                        )
                    }
                </div>
                <div className='flex flex-row gap-2 items-center'>
                    <div className=" w-full  flex flex-col justify-center items-center">
                        <div className="p-4 pb-0 pt-0 flex  lg:flex-row flex-col gap-4 justify-between items-center w-full"> 
                            <div className='flex flex-col lg:order-1 order-2 gap-2 w-full lg:min-w-[300px]'>
                                <User data={data}/>   
                                <Employer/> 
                            </div>
                            <Message/> 
                        </div> 
                    </div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Page
