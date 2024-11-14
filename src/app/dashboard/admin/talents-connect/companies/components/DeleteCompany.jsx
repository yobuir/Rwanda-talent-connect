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
import { toast } from "@/hooks/use-toast";
import { deleteCompany } from "@/utils/admin/employers/companies/DeleteCompany";
import { useState } from "react";

export function DeleteCompany({company}) { 
    const [loading, setLoading] = useState(false);
    const handleChanges = async (checked) => {
      setLoading(true); 
  
      try { 
        const response = await deleteCompany(company._id);

        if (response.success) {
        toast({
            variant: "default",
            title: "Company Deleted",
            description: "Company has been Deleted successfully.",
          });  
          window.location.reload();
        } else {
          toast({
            variant: "destructive",
            title: "Profile deletion Failed",
            description: "An error occurred while Deleted Company. Please try again.",
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
  
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleChanges} disabled={loading}>{ loading ? "Loading..." : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
