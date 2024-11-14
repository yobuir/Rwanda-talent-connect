import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" 
import { CirclePlus, Pencil } from "lucide-react"
import { useState } from "react"

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
import { CustomDialog } from "@/app/components/CustomDialog"
import { Checkbox } from "@/components/ui/checkbox"

 
export function HourRate() {
    const [add, setAdd] = useState(true)
    const [open, setOpen] = useState(false)
  const [value, setValue] =useState("")
  
  const trigger = (<Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
            <span className="flex gap-2 items-center">{add ? ( <CirclePlus  />) : <Pencil />}</span>
          </Button>)
  
const content= ( <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 items-center gap-4">
            <Label htmlFor="headline" className="text-left">
              Hourly Amount
            </Label>
            <Input id="amount"  placeholder="Ex: 10000 - 15000 or 10000" className="col-span-1" />
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
            <Checkbox id="negotiable" />
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
          <Button type="submit">Save changes</Button>
        </div>)
  return (

        <CustomDialog trigger={trigger} content={content} title="💴 Set rate / hr." description=" Set your rate per hour." />

  )
}
