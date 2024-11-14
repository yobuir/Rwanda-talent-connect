"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import EditCompany from "./components/EditCompany"
export const columns= [
    {
    accessorKey: "status", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const status = (row.getValue("status"))
      return  <Badge className={" capitalize"} variant={status != 'active' ? 'outline' : ''}>{status}</Badge> 
    },
  },
  {
    accessorKey: "companyName",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {    
    accessorKey: "address",
    header: () => <div className="">address</div>,
    cell: ({ row }) => { 
      const address = (row.getValue("address")) 
      return <div className="">{address}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Create At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => { 
      const createdAt = new Date(row?.getValue("createdAt")).toLocaleDateString()
      return <div className="">{createdAt}</div>
    },
  },

  //   {    
  //   accessorKey: "owner",
  //   header: () => <div className="">owner</div>,
  //   cell: ({ row }) => { 
  //     const owner = (row.getValue("owner")) 
  //     return <div className="">{owner}</div>
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      const company = row.original 
      return (
        <div>
          <EditCompany company={company}/> 
        </div>
      )
    }
}
]
