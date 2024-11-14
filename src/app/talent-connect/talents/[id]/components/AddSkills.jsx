import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

import { LANGUAGES, SKILLS_OPTIONS } from "@/lib/Constants"
import { Select } from "antd"
import { UpdateUSer } from "@/utils/talentConnect/users/updateUser"
import { toast } from "@/hooks/use-toast"

export function AddSkills({user}) {  
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLanguageItems, setSelectedLanguageItems] = useState([]);
    const filteredOptions = SKILLS_OPTIONS.filter((o) => !selectedItems.includes(o));
    const filteredLanguageOptions = LANGUAGES.filter((o) => !selectedLanguageItems.includes(o));
    const [loading, setLoading] = useState(false);

  useEffect(() => {
        setSelectedItems(user?.talentProfile?.skills??[])
        setSelectedLanguageItems(user?.talentProfile?.languagesSpoken??[]) 
    }, [user])


      const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {
            const updateData = {};
            if (selectedLanguageItems) updateData.languagesSpoken = selectedLanguageItems;
            if (selectedItems) updateData.skills = selectedItems;

            const response = await UpdateUSer(updateData); 

            if (response.status =='success') { 
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
                title: "An unexpected error occurred. Please try again" ,
                description: error.message || "An unexpected error occurred. Please try again later.",
            });
        }
        finally {
        setLoading(false);
        }
    };

    
  return (
    <div className="flex flex-col  gap-4">
       <div className="grid grid-cols-1 items-center gap-4 mt-4">
            <Select
                mode="multiple"
                placeholder="Add skills"
                value={selectedItems}
                onChange={setSelectedItems}
                style={{
                    width: '100%',
                }}
                options={filteredOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
                <div className="flex">
                  {
                  selectedItems.length?(
                      <Button size="sm" disabled={loading} onClick={submitAllChanges} >
                        {'Save changes'}
                      </Button>
                    ):(null)}
                </div>   
          </div>
        <div className="grid grid-cols-1 items-center gap-4">
            <Select
                mode="multiple"
                placeholder="Add languages spoken" 
                value={selectedLanguageItems}
                onChange={setSelectedLanguageItems}
                style={{
                    width: '100%',
                }}
                options={filteredLanguageOptions.map((item) => ({
                    value: item,
                    label: item,
                }))}
                />
                <div className="flex">
                  {
                  selectedLanguageItems.length?(
                      <Button size="sm" disabled={loading} onClick={submitAllChanges} >
                        {'Save changes'}
                      </Button>
                    ):(null)}
                </div>   
          </div>
    </div>
  )
}
