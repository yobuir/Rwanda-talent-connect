import { Button } from "@/components/ui/button"
import { useState } from "react"

import { LANGUAGES, SKILLS_OPTIONS } from "@/lib/Constants"
import { Select } from "antd"

export function AddSkills() {
    const [add, setAdd] = useState(true)
    const [open, setOpen] = useState(false)
    const [value, setValue] =useState("")
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedLanguageItems, setSelectedLanguageItems] = useState([]);
    const filteredOptions = SKILLS_OPTIONS.filter((o) => !selectedItems.includes(o));
    const filteredLanguageOptions = LANGUAGES.filter((o) => !selectedLanguageItems.includes(o));
  return (
    <div className="flex flex-col  gap-4">
       <div className="grid grid-cols-1 items-center gap-4">
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
                      <Button size="sm" >
                        Save changes
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
                      <Button size="sm" >
                        Save changes
                      </Button>
                    ):(null)}
                </div>   
          </div>
    </div>
  )
}
