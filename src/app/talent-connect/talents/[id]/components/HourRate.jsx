import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import { CirclePlus, Pencil } from "lucide-react"
import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import { CURRENCIES } from "@/lib/Constants"
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
import { CustomDialog } from "@/app/components/talentConnect/CustomDialog"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"
import { UpdateUSer } from "@/utils/talentConnect/users/updateUser"

 
export function HourRate({user}) {
    const [add, setAdd] = useState(true)
    const [open, setOpen] = useState(false)
    const [value, setValue] =useState("")
    const [rateAmount , setRateAmount] = useState("")
    const [isNegotiable, setIsNegotiable] = useState(false)
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setValue(user?.currency)
        setRateAmount(user?.rateAmount)
        setIsNegotiable(user?.isNegotiable)
    }, [user])


      const submitAllChanges = async () => {
        
        setLoading(true);
    
        try {
            const updateData = {};
            if (value) updateData.currency = value;
            if (rateAmount) updateData.rateAmount = rateAmount;

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
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
  
const content= ( <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="headline" className="text-left">
              Hourly Amount
            </Label>
            <Input id="amount" type="number" min={1}   value={rateAmount} onChange={(e) => setRateAmount(e.target.value)}  placeholder="Ex: 10000 - 15000 or 10000" className="col-span-1" />
          </div> 
          <div className="grid grid-cols-1 items-center gap-4">
              <Label htmlFor="headline" className="text-left">
              Currency
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
                        ? CURRENCIES.find((currency) => currency.value === value)?.label
                        : "Select currency..."}
                    <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                    <Command>
                    <CommandInput placeholder="Search currency..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No currency found.</CommandEmpty>
                        <CommandGroup>
                        {CURRENCIES.map((currency) => (
                            <CommandItem
                            key={currency.value}
                            value={currency.value}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                            >
                            {currency.label}
                            <Check
                                className={cn(
                                "ml-auto",
                                value === currency.value ? "opacity-100" : "opacity-0"
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
          <div className="items-top flex space-x-2">
            <Checkbox id="negotiable" checked={isNegotiable} onCheckedChange={setIsNegotiable} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="negotiable"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Negotiable
              </label>
              <p className="text-sm text-muted-foreground">
                Your hourly rate is negotiable ?
              </p>
            </div>
          </div>
          <Button disabled={loading} onClick={submitAllChanges}>{ loading ? "Saving..." : "Save changes" }</Button>
        </div>)
  return (

        <CustomDialog trigger={trigger} content={content} title="💴 Set rate / hr." description=" Set your rate per hour." />

  )
}
