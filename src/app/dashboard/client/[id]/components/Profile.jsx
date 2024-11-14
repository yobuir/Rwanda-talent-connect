'use client';
import { CustomDialog } from '@/app/components/CustomDialog'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CirclePlus, Pencil } from 'lucide-react';
import React from 'react';

function Profile() {

    const [add, setAdd] = React.useState(false);

    const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="headline" className="text-left">
              Headline
            </Label>
            <Input id="headline"  placeholder="Ex: Movie Actor" className="col-span-1" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="bio" className="text-left">
                Your Bio            
            </Label>
            <Textarea id="bio" rows={6} placeholder="Write a few sentences about yourself" className="col-span-3"></Textarea>
          </div>
          <Button>
            Save changes
          </Button>
        </div>
    )
  return (
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
            <h1 className='font-semibold text-lg '>👋 Introduce yourself to the world  </h1>
                <CustomDialog trigger={trigger} content={content} title="👋Introduce yourself to the world." description="Make changes to your profile here. Click save when you're done." />
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
                <h3 className=''> Add headline and bio </h3>
            </div>
        </CardContent>
    </Card> 
  );
}

export default Profile;
