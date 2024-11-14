import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BasicInformation } from '../BasicInformation';
import { HourRate } from '../HourRate';
import { AddSkills } from '../AddSkills';
import { CharacterInformation } from '../CharacterInformation';

function GBasicInformation() {
  return (
   <>
   <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
            <h1 className='font-semibold text-lg '>👋 Introduce yourself to the world  </h1>
                <BasicInformation/>
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
                <h3 className=''> Add headline and bio </h3>
            </div>
        </CardContent>
    </Card> 
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
            <h1 className='font-semibold text-lg'> 💴 Set rate / hr  </h1>
                <HourRate/>
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
            <h3 className=''> Set your rate per hour. </h3>
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
            <AddSkills/>
        </CardContent>
    </Card>
    <Card className="shadow-none border border-dashed  border-gray-200 relative "> 
        <CardContent>
            <div className='flex gap-2 justify-between py-4 pb-0 items-center'>
            <h1 className='font-semibold text-lg'> 👤 Character information  </h1>
            </div>
            <div className='flex flex-col gap-2 text-gray-500'>
                <h3 className=''>Add your Character information . to get matched with need based projects  </h3>
                <span className='text-xs text-gray-500'>Ex: age, height,skin color, hair color , eye color, body type and weight </span>
            </div>
            <div className='flex gap-2 justify-between mt-3 items-center'>
            <CharacterInformation/>
            </div>
        </CardContent>
    </Card>
   </>
  );
}

export default GBasicInformation;
