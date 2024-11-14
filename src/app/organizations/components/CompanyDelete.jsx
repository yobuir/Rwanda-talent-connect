'use client';
import React, { useState } from 'react'
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
import { Button } from "@/components/ui/button"
import { deleteCompany } from '@/utils/companies/client/deleteCompany';
import { toast } from '@/hooks/use-toast';

 export default function CompanyDelete  ({company}) {
  const [loading, setLoading] = useState(false);
  const confirmDelete =async ()=>{
    const response = await deleteCompany(company?._id);
      try{
        if (response.success) {
          toast({
            variant: 'default',
            title: 'Company Updated Successfully',
            description: 'Your company has been updated successfully.',
          }); 
        } else {
          toast({
            variant: 'destructive',
            title: 'Company Update Failed',
            description: 'An error occurred while updating your company. Please try again.',
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        toast({
          variant: 'destructive',
          title: 'Unexpected Error',
          description: error.message || 'An unexpected error occurred. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
  }
    
  return ( 
    <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant="outline" className="border border-red-500 text-red-500 hover:text-red-700 hover:bg-red-300 ">Delete company profile and it's data</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            company profile and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel> 
          <Button onClick={confirmDelete} variant={`destructive`}  disabled={loading}>
            {loading ? 'loading...' : 'Confirm and delete'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog> 
  )
}