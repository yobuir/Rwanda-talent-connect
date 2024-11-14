'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import { UpdateUSer } from '@/utils/talentConnect/users/updateUser';
import { updateTalent } from '@/utils/admin/talents/updateTalent';
import { toast } from '@/hooks/use-toast';
import { Select } from 'antd';

function ProfileActionPanel({ user }) {
  const [profileStatus, setProfileStatus] = useState();
  const [verifiedStatus, setVerifiedStatus] = useState(false);
  const [loading, setLoading] = useState(false);

  const options = [
    { value: 'pending', label: 'Pending' },
    { value: 'published', label: 'Published' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'suspended', label: 'Suspended' },
  ];
  useEffect(() => {
    if (user?.isProfilePublished) {
      setVerifiedStatus(user?.isProfilePublished);
    }
    setProfileStatus(user?.status);
  }, [user]);
 

  const handleChanges = async (checked, profile_status) => {
    setLoading(true);
    setVerifiedStatus(checked);

    try {
      const updateData = {};
      if (checked !== undefined) updateData.isProfilePublished = checked;
      if(profile_status !== undefined) updateData.status = profile_status;
      if (user._id) updateData.id = user._id;

      const response = await updateTalent(updateData);

      if (response.status == 'success') {
        toast({
          variant: "default",
          title: "Profile Updated",
          description: "Your profile has been updated successfully.",
        });
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
        title: "An unexpected error occurred. Please try again",
        description: error.message || "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setProfileStatus(value); 
    handleChanges(undefined, value); 
  };

  return (
    <div className="py-4">
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>
            <div className='flex justify-between gap-3'>
              <div>
                <h2>Permissions</h2>
              </div>
              <div>
                {
                  loading && (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-gray-900"></div>
                      <p>Loading...</p>
                    </div>
                  ) 
                  }
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col gap-3'>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">
                  Verification
                </Label>
                <div>
                  Profile is verified
                </div>
              </div>
              <div> 
                <Switch
                  checked={verifiedStatus}
                  onCheckedChange={handleChanges}
                /> 
              </div>
            </div>
            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">
                  Profile visibility
                </Label>
                <div>
                  Profile is visible to everyone.
                </div>
              </div>
              <div>  
              <div>
                  <Select 
                      className='w-full'
                      placeholder={"Select a status"}
                      value={profileStatus}
                      onChange={handleSelectChange}
                      style={{ width: '100%' }}
                      options={options.map((item) => ({
                          value: item.value || item,
                          label: item.label || item,
                      }))}
                  />
              </div>
              </div>
            </div> 
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfileActionPanel;
