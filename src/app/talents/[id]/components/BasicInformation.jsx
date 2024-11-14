import { CustomDialog } from "@/app/components/CustomDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CirclePlus, Pencil } from "lucide-react"
import { useState } from "react"

export function BasicInformation() {
    const [add, setAdd] = useState(true)

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
        <CustomDialog trigger={trigger} content={content} title="👋Introduce yourself to the world." description="Make changes to your profile here. Click save when you're done." />

  )
}
