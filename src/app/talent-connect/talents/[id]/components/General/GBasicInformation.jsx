import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import BasicInformation from '../BasicInformation';
import { HourRate } from '../HourRate';
import { AddSkills } from '../AddSkills';
import { CharacterInformation } from '../CharacterInformation';
import { getUser } from '@/utils/talentConnect/users/getUser';

function GBasicInformation() {

    const [userData, setUserData] = useState(null); 

    useEffect(() => { 
        getUser()
        .then((data) => {
            setUserData(data);
        }) 
    }, []);  
    return (
<> 
    <BasicInformation user={userData}/>    
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
            <h1 className='font-semibold text-lg'>  💴 {userData?.talentProfile?.rate?.amount ?? 'Set rate'} {userData?.talentProfile?.rate?.currency??''} / hr  </h1>
                <HourRate user={userData}/>
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
            <h3 className=''>  
                {userData?.talentProfile?.rate?.amount ?? 'Set your rate per hour.'} {userData?.talentProfile?.rate?.currency??''} 
                {
                    userData?.talentProfile?.rate?.isNegotiable
                    ? ' (Negotiable)'
                    : ''
                }
                </h3>
            </div>
        </CardContent>
    </Card>  
    <Card className="shadow-none border border-dashed   border-gray-200 relative "> 
        <CardContent>
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
            <h1 className='font-semibold text-lg'> 🎨 Skills  and Langues  </h1>
            </div>
            <div className='flex gap-2 justify-between text-gray-500  items-center'>
            <h3 className=''> Add your skills and langues. </h3>
            </div>
            <AddSkills  user={userData}/>
        </CardContent>
    </Card>
    <Card className="shadow-none border border-dashed  border-gray-200 relative "> 
        <CardContent>
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
                <h1 className='font-semibold text-lg'> 👤 Character information  </h1>
            </div>
            <div className='flex flex-col gap-2 text-gray-500'>
                <h3 className=''> 
                    {
                    userData?.talentProfile?.gender != null || userData?.talentProfile?.age != null || userData?.talentProfile?.height || 
                    userData?.talentProfile?.weight || 
                    userData?.talentProfile?.skinColor || 
                    userData?.talentProfile?.eyeColor || 
                    userData?.talentProfile?.hairColor || 
                    userData?.talentProfile?.bodyType ? (<>Edit </>) :(<>Add </>)
                }
                your Character information . to get matched with need based projects  </h3>
                <span className='text-xs text-gray-500'>Ex: age, height,skin color, hair color , eye color, body type and weight </span>
                <div>
                {
                    userData?.talentProfile?.gender != null || userData?.talentProfile?.age != null || userData?.talentProfile?.height || 
                    userData?.talentProfile?.weight || 
                    userData?.talentProfile?.skinColor || 
                    userData?.talentProfile?.eyeColor || 
                    userData?.talentProfile?.hairColor || 
                    userData?.talentProfile?.bodyType ? (<>
                    <div className='flex flex-row flex-wrap gap-2'>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Gender  : { userData?.talentProfile?.gender }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Age : { userData?.talentProfile?.age }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Height : { userData?.talentProfile?.height }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Weight : { userData?.talentProfile?.weight }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Skin Color : { userData?.talentProfile?.skinColor }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Eye Color : { userData?.talentProfile?.eyeColor }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Hair Color : { userData?.talentProfile?.hairColor }
                        </span>
                        <span className='capitalize border text-gray-500 px-4 py-1 rounded-full flex gap-3'>
                            Body Type : { userData?.talentProfile?.bodyType }
                        </span> 
                    </div> 
                    </>) :('')
                }
                </div>
            </div>
            <div className='flex gap-2 justify-between mt-3 items-center'>
                <CharacterInformation user={userData}/>
            </div>
        </CardContent>
    </Card>
   </>
  );
}

export default GBasicInformation;
