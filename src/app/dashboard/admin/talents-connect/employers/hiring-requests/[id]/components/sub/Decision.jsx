'use client';
import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 


import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { updateRequestStatus } from '@/utils/admin/talents/requests/updateRequest';
import { toast } from '@/hooks/use-toast';

function Decision({data}) {
  const [selectedDecision, setSelectedDecision] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [status, setStatus] = useState(null); 
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setSelectedDecision(data.status);
  }, [data.status]);


  const saveData = async () => {
    try {
      setLoading(true);
        const formData={};
        if (status) formData.status = status;
        if(rejectionReason) formData.rejectionReason = rejectionReason;
        if(data._id) formData.id = data._id;
        const response = await updateRequestStatus(formData);
      console.log(response)
        if (response.status == 'success') {
          toast({
            variant: "default",
            title: "Profile Updated",
            description: "Your profile has been updated successfully.",
          });
          window.location.reload();
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
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='flex flex-col gap-2'>
          <Button variant="outline" size="sm">Decision</Button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> Decision   </AlertDialogTitle>
          <AlertDialogDescription>
            Select a decision
          </AlertDialogDescription>
          <div className='w-full'>
            <Select 
              className='w-full'
              defaultValue={selectedDecision ?? 'pending'}
              name="status"
              onValueChange={(e) => setStatus(e)}
            >
                <SelectTrigger className="w-[100%]">
                    <SelectValue placeholder="Select a decision" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Choose a decision</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="hired">Hired</SelectItem> 
                    </SelectGroup>
                </SelectContent>
            </Select>
            {
              status === "rejected" && (
                <div className='mt-5 flex flex-col gap-2'>
                  <Label>Rejection Reason</Label>
                  <Textarea placeholder="Reason" value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} className="w-full" name="reason"  />
                </div>
              )
            } 
        </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}  >Cancel</AlertDialogCancel>
          <Button onClick={saveData} disabled={loading}  >{ loading ? "Saving...":"Save" }
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Decision;
