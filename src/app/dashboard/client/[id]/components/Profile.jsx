'use client';
import { CustomDialog } from '@/app/components/talentConnect/CustomDialog'; 
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea'; 
import { toast } from '@/hooks/use-toast';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
import { CirclePlus, Pencil } from 'lucide-react';
import React from 'react';

function Profile({ user }) {
  
    const [add, setAdd] = React.useState(false); 
    const [headline, setHeadline] = React.useState(user?.talentProfile?.headline);
    const [bio, setBio] = React.useState(user?.talentProfile?.bio);

    const [loading, setLoading] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);


    React.useEffect(() => {
      setHeadline(user?.talentProfile?.headline?? '');
      setBio(user?.talentProfile?.bio?? '');
      
    }, [user]);



      const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {
            const updateData = {};
            if (headline) updateData.headline = headline;
            if (bio) updateData.bio = bio;

            const response = await UpdateUSer(updateData); 
            console.log(response)

            if (response.status =='success') { 
                toast({
                    variant: "default",
                    title: "Profile Updated",
                    description: "Your profile has been updated successfully.",
                    });  
              setIsModalOpen(false);
            } else { 
                toast({
                    variant: "destructive",
                    title: "Profile Update Failed",
                    description: "An error occurred while updating your profile. Please try again.",
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error); 
            toast({
                variant: "destructive",
                title: "An unexpected error occurred. Please try again" ,
                description: error.message || "An unexpected error occurred. Please try again later.",
            });
        }
        finally {
        setLoading(false);
        }
    };

    const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="headline" className="text-left">
              Headline
            </Label>
            <Input id="headline"  onChange={(e) => setHeadline(e.target.value)} value={headline}  placeholder="Ex: Movie Actor" className="col-span-1" />
          </div>
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="bio" className="text-left">
                Your Bio            
            </Label>
            <Textarea id="bio" onChange={(e) => setBio(e.target.value)} value={bio} rows={6} placeholder="Write a few sentences about yourself" className="col-span-3"></Textarea>
          </div>
          <Button disabled={loading} onClick={submitAllChanges}>
            {loading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
    )
  return (
    <Card className="shadow-none border border-dashed   border-gray-200 relative ">
        <CardContent>  
            <div className='flex gap-2 justify-between py-4  pb-0 items-center'>
            <h1 className='font-semibold text-lg '> {headline? headline:'👋 Introduce yourself to the world'}   </h1>
                <CustomDialog isOpen={isModalOpen} trigger={trigger} content={content} title="👋Introduce yourself to the world." description="Make changes to your profile here. Click save when you're done."/>
            </div>
            <div className='flex gap-2 justify-between  text-gray-500 items-center'>
                <h3 className=''> {bio? bio:'Add headline and bio'} </h3>
            </div>
        </CardContent>
    </Card> 
  );
}

export default Profile;
