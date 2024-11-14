import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
function UserInformation({onSubmitUserData}) {
 
    const [gender, setGender] = useState(''); 
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [headline, setHeadline] = useState('');
    const [bio, setBio] = useState('');
    const [confirmedBioHeadline, setConfirmedBioHeadline] = useState(false);

    const handleSubmit = () => { 
        if (headline && bio) {
            onSubmitUserData({ headline, bio, gender, age, height, weight });
            setConfirmedBioHeadline(true);
        } else {
            alert('Please provide a headline and bio.');
        }
    };

  return (
     <>
      {
        headline && bio && confirmedBioHeadline ? (
            <>
            <div className='flex gap-2 items-center'>
                {/* <Button onClick={() => setConfirmedBioHeadline(false)} className='text-orange-500 bg-orange-500/20 p-2 rounded hover:bg-orange-500 hover:text-white '> 
                    <ChevronLeft size={26} />
                </Button>  */}
                <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                ℹ️ Other required information
                </h3>
            </div> 
            <div className='flex flex-col gap-4'>
                <Label htmlFor="height" className="text-left">
                What is your age?
                </Label>
                <Input
                    type="month"
                    id="age"
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age}
                    placeholder="Age"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
                    required
                />

                <div className="flex flex-col  gap-4">
                    <Label htmlFor="height" className="text-left">
                    How tall are you? (cm)
                    </Label>
                    <Input id="height" min={1} type="number"
                    onChange={(e) => setHeight(e.target.value)} className="w-full" />
                </div>
                <div className="flex flex-col  gap-4">
                    <Label htmlFor="height" className="text-left">
                    How much do you weigh? (kg)
                    </Label>
                    <Input id="height" type="number" min={1} onChange={(e) => setWeight(e.target.value)}  className="w-full" />
                </div> 
            </div>
            </>
        ):(
            <>
            <div className='flex gap-2 items-center'>
                {/* <Button onClick={() => setGender('')} className='text-orange-500 bg-orange-500/20 p-2 rounded hover:bg-orange-500 hover:text-white '> 
                    <ChevronLeft size={26} />
                </Button>  */}
                <h3 className=" text-lg font-medium text-gray-900 dark:text-white">
                👋Introduce yourself to the world.
                </h3>
            </div> 
            <div className='flex flex-col gap-4'> 
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="headline" className="text-left">
                        What is your headline?
                    </Label>
                    <Input id="headline"  placeholder="Ex: Movie Actor" onChange={(e) => setHeadline(e.target.value)}  className="col-span-1" />
                </div>
                <div className="grid grid-cols-1 items-center gap-4">
                    <Label htmlFor="bio" className="text-left">
                        Your Bio            
                    </Label>
                    <Textarea id="bio" rows={6} onChange={(e) => setBio(e.target.value)} placeholder="Write a few sentences about yourself" className="col-span-3"></Textarea>
                </div>
            </div>       
        </>)
    }
    <Button onClick={handleSubmit}  className='bg-orange-500 hover:bg-orange-600 text-white'>
        Next
    </Button>
</>

  )
}

export default UserInformation