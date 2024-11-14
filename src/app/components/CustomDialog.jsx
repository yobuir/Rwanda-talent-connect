'use client';
import React, { useEffect, useState } from "react" 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer" 
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"

export function CustomDialog({ trigger, content, title, description,DialogOpen }) {
 
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (DialogOpen) {
      setIsOpen(true)
      setOpen(true)
    }
  }, [DialogOpen])

  const [open, setOpen] = useState(isOpen ?? false)

  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[625px]">
            <DrawerHeader className="text-left">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
                {description}
            </DialogDescription>
            </DrawerHeader>
            <div className="p-4 max-h-[calc(100vh-220px)] overflow-auto " >
            {content}
            </div>
         
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {trigger}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4 h-[calc(100vh-220px)] overflow-auto " >
        {content}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
