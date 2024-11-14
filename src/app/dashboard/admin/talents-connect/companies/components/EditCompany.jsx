import { CustomDialog } from '@/app/components/talentConnect/CustomDialog'
import { Button } from '@/components/ui/button' 
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import { updateCompany } from '@/utils/admin/employers/companies/updateCompany';
import { Pencil } from 'lucide-react'
import React,{ useState,useEffect } from 'react'
import { DeleteCompany } from './DeleteCompany';

function EditCompany({company}) { 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVerified,setIsVerified] = useState(); 
    const [loading, setLoading] = useState(false); 
      useEffect(() => {
        if (company?.status == 'active') {
          setIsVerified(true);
        } 
      }, [company]);

    const handleChanges = async (checked) => {
      setLoading(true);
      setIsVerified(checked);
  
      try {
        const updateData = {};
        if (checked !== undefined) updateData.status = checked?'active':'pending'; 
        if (company._id) updateData.companyId = company._id;
  
        const response = await updateCompany(updateData);

        if (response.success) {
          toast({
            variant: "default",
            title: "Company Updated",
            description: "Company has been updated successfully.",
          }); 
          setIsModalOpen(false);
          window.location.reload();
        } else {
          toast({
            variant: "destructive",
            title: "Profile Update Failed",
            description: "An error occurred while updating Company. Please try again.",
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
  


    const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center"> <Pencil /> Edit</span>
          </Button>)
    const content = (
      <div className="grid gap-4 py-4"> 
          <div className="flex flex-row items-center justify-between rounded-lg border p-4"> 
                  <div className="space-y-0.5">
                    <Label className="text-base">
                      Verification
                    </Label>
                    <div>
                      Company is verified
                    </div>
                  </div>
                  <div> 
                    <Switch
                      checked={isVerified}
                      onCheckedChange={handleChanges}
                    /> 
                  </div> 
            </div> 

              <div className="flex flex-row border-red-500 bg-red-500/10 items-center justify-between rounded-lg border p-4"> 
                  <div className="space-y-0.5">
                    <Label className="text-base text-red-500">
                      Danger
                    </Label>
                    <div>
                      Delete company with all its data
                    </div>
                  </div>
                  <div>  
                    <DeleteCompany company={company}/>
                  </div> 
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
    )

  return (
    <div>
        <CustomDialog isOpen={isModalOpen} trigger={trigger} content={content} title={company?.companyName} description={
          company?.activityDescription
        }/>
    </div>
  )
}

export default EditCompany