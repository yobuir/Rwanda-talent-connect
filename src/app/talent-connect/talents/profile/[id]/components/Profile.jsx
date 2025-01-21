import React from 'react'
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRightLeft, Building, Calendar, ImageUp, Link, Map, Star, Tag, User, Users } from 'lucide-react';

function Profile({user,categoryName}) {
  return (
    <div>
       <Card className="shadow-none border border-dashed py-6 border-gray-200 relative ">
            <CardContent className="flex flex-col gap-4"> 
            {
                categoryName && (
                    <div className='flex'>
                        <span className='capitalize  bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1'>
                        <Tag size={14} /> {categoryName || 'Talent'}
                    </span>
                    </div>
                    
                )
            } 
            {
                user?.address && (
                    <div>
                        <strong>Location: </strong> {user?.address}
                    </div>
                )
            } 

            {
                user?.talentProfile?.rate?.amount && (
                    <div>
                        <strong>Hourly Rate: </strong>
                        {user?.talentProfile?.rate?.amount ?? ''} {user?.talentProfile?.rate?.currency??''}  <strong>/ hr</strong> 
                        {
                            user?.talentProfile?.rate?.isNegotiable
                            ? ' (Negotiable)'
                            : ''    
                        }
                    </div>
                )
            } 
            {
                user?.talentProfile?.skills?.length > 0 && (
                    <div>
                        <strong className=''>Skills:</strong> 
                        <ul className='flex flex-wrap gap-2 mt-2'> 
                        {
                            user?.talentProfile?.skills?.map((skill, index) => (
                            <li  className='capitalize border text-gray-600 px-4 py-1 rounded-full flex gap-3'  key={index}>{skill}</li>
                            ))
                        }    
                        </ul>
                    </div>
                )
            } 
            {
                user?.talentProfile?.languagesSpoken?.length > 0 && (
                    <div>
                        <strong>Languages: </strong> 
                        <ul className='flex flex-wrap gap-2 mt-2'> 
                        {
                            user?.talentProfile?.languagesSpoken?.map((language, index) => (
                            <li className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3' key={index}>{language}</li>
                            ))
                        }
                        </ul>
                    </div>            
                )
            } 
            {
                user?.talentProfile?.languagesSpoken?.length > 0 && (
                    <div>
                        <strong>Languages: </strong> 
                        <ul className='flex flex-wrap gap-2 mt-2'> 
                        {
                            user?.talentProfile?.languagesSpoken?.map((language, index) => (
                            <li className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3' key={index}>{language}</li>
                            ))
                        }
                        </ul>
                    </div>            
                )
            } 
            </CardContent>
            </Card> 
    </div>
  )
}

export default Profile
