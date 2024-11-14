import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import { CirclePlus, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

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
import { UpdateUSer } from "@/utils/users/updateUser"
import { toast } from "@/hooks/use-toast"
  
export function CharacterInformation({user}) {

    const [loading, setLoading] = useState(false);
  
    const [add, setAdd] = useState(true)
    const [open, setOpen] = useState(false)
    const [openGender, setOpenGender] = useState(false)
    const [value, setValue] =useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [skinColor , setSkinColor] = useState("")
    const [eyeColor, setEyeColor] = useState("")
    const [hairColor, setHairColor] = useState("")
    const [bodyType, setBodyType] = useState("")


  useEffect(() => { 
    setValue(user?.talentProfile?.gender || '')
    setAge(user?.talentProfile?.age || '')
    setHeight(user?.talentProfile?.height || '')
    setWeight(user?.talentProfile?.weight || '')
    setSkinColor(user?.talentProfile?.skinColor || '')
    setEyeColor(user?.talentProfile?.eyeColor || '')
    setHairColor(user?.talentProfile?.hairColor  || '')
    setBodyType(user?.talentProfile?.bodyType  || '')
    if (user?.talentProfile.gender != null || user?.talentProfile.age != null || user?.talentProfile?.height ||
        user?.talentProfile?.weight ||
        user?.talentProfile?.skinColor ||
        user?.talentProfile?.eyeColor ||
        user?.talentProfile?.hairColor  ) {
      setAdd(false)
    }
    }, [user])


 

      const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {
            const updateData = {};
            if (age) updateData.age = age;
            if(value) updateData.gender = value;
            if (height) updateData.height = height;
            if (weight) updateData.weight = weight;
            if (skinColor) updateData.skinColor = skinColor;
            if (eyeColor) updateData.eyeColor = eyeColor;
            if (hairColor) updateData.hairColor = hairColor;
            if (bodyType) updateData.bodyType = bodyType;


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
            type="month" value={age} onChange={(e) => setAge(e.target.value)}  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6" />
          </div> 
          <div className="flex flex-col  gap-4">
            <Label htmlFor="height" className="text-left">
              Height (cm)
            </Label>
            <Input id="height" value={height} onChange={(e) => setHeight(e.target.value)}  min={1} type="number" className="w-full" />
          </div>
          <div className="flex flex-col  gap-4">
            <Label htmlFor="height" className="text-left">
            Weight (kg)
            </Label>
            <Input id="height" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} min={1}  className="w-full" />
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
                    {bodyType
                        ? BODY_TYPES.find((body_type) => body_type.value === bodyType)?.label
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
                                setBodyType(currentValue === bodyType ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            {body_type.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                bodyType === body_type.value ? "opacity-100" : "opacity-0"
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
                <Input id="skin_color" value={skinColor} onChange={(e) => setSkinColor(e.target.value)} type="text" className="w-full" />
            </div> 
            <div className="flex flex-col  gap-4">
                <Label htmlFor="hair color" className="text-left">
                Hair color  
                </Label>
                <Input id="hair color" min={1} value={hairColor} onChange={(e) => setHairColor(e.target.value)} type="text" className="w-full" />
            </div> 
            <div className="flex flex-col  gap-4">
                <Label htmlFor="eye_color" className="text-left">
                    Eye color
                </Label>
                <Input id="eye_color" value={eyeColor} onChange={(e) => setEyeColor(e.target.value)} type="text" min={1}  className="w-full" />
            </div>
        </div>
        <Separator className="my-4" />
        <Button onClick={submitAllChanges}>
          {
            loading ? ( 
                'Saving...'
            ) : (
              "Save"
            )
          }
        </Button>
        </>
)
  return (
    <> 
        <CustomDialog trigger={trigger} content={content} title="Character informations" description="Edit your Character informations" />
    </>
  
  )
}
