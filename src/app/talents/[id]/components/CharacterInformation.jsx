import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import { CirclePlus, Pencil } from "lucide-react"
import { useState } from "react"

import { cn } from "@/lib/utils"
import { BODY_TYPES, GENDERS } from "@/lib/Constants"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Separator } from "@/components/ui/separator"
import { CustomDialog } from "@/app/components/CustomDialog"
  
export function CharacterInformation() {
    const [add, setAdd] = useState(true)
    const [open, setOpen] = useState(false)
    const [openGender, setOpenGender] = useState(false)
    const [value, setValue] =useState("")


const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />} Characters informations</span>
            </Button>)

const content= (
    <>
     <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 py-4">
          <div className="flex flex-col  gap-4">
            <Label htmlFor="age" className="text-left">
              Gender
            </Label>
             <Popover open={openGender} onOpenChange={setOpenGender}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openGender}
                    className="w-full justify-between"
                    >
                    {value
                        ? GENDERS.find((gender) => gender.value === value)?.label
                        : "Select gender..."}
                    <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                    <CommandInput placeholder="Search gender..." />
                    <CommandList>
                        <CommandEmpty>No gender found.</CommandEmpty>
                        <CommandGroup>
                        {GENDERS.map((gender) => (
                            <CommandItem
                            key={gender.value}
                            value={gender.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            {gender.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                value === gender.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
            </Popover> 
          </div> 
          <div className="flex flex-col  gap-4">
            <Label htmlFor="age" className="text-left">
              Age
            </Label>
            <Input id="age"  
            type="month" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div> 
          <div className="flex flex-col  gap-4">
            <Label htmlFor="height" className="text-left">
              Height (cm)
            </Label>
            <Input id="height" min={1} type="number" className="w-full" />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="height" className="text-left">
            Weight (kg)
            </Label>
            <Input id="height" type="number" min={1}  className="w-full" />
          </div>
        <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="body_type" className="text-left">
              Body type
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                    >
                    {value
                        ? BODY_TYPES.find((body_type) => body_type.value === value)?.label
                        : "Select BODY TYPE..."}
                    <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                    <CommandInput placeholder="Search body_type..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No body_type found.</CommandEmpty>
                        <CommandGroup>
                        {BODY_TYPES.map((body_type) => (
                            <CommandItem
                            key={body_type.value}
                            value={body_type.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            {body_type.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                value === body_type.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                            </CommandItem>
                        ))}
                        </CommandGroup>
                    </CommandList>
                    </Command>
                </PopoverContent>
                </Popover>
          </div>
        </div> 
        <Separator className="my-4" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 py-4">
            <div className="flex flex-col  gap-4">
                <Label htmlFor="skin_color" className="text-left">
                Skin Color
                </Label>
                <Input id="skin_color" type="text" className="w-full" />
            </div> 
            <div className="flex flex-col  gap-4">
                <Label htmlFor="hair color" className="text-left">
                Hair color  
                </Label>
                <Input id="hair color" min={1} type="number" className="w-full" />
            </div>
            <div className="flex flex-col  gap-4">
                <Label htmlFor="eye_color" className="text-left">
                    Eye color
                </Label>
                <Input id="eye_color" type="number" min={1}  className="w-full" />
            </div>
        </div>
        <Separator className="my-4" />
        <Button>Save changes</Button>
        </>
)
  return (
    <> 
        <CustomDialog trigger={trigger} content={content} title="Character informations" description="Edit your Character informations" />
    </>
  
  )
}
