"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

import { ArrowUpDown } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
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
      return  <>
      {
        status === "approved" ? <Badge className="bg-green-600">Approved</Badge> : <Badge className="bg-red-600">Pending</Badge>
      }
      </>
    },
  },
  {
    accessorKey: "fullName",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => { 
      const name = row?.original?.talent?.fullName 
      return <div className="">{name}</div>
    },
  },
    {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => { 
      const email = row?.original?.talent?.email 
      return <div className="">{email}</div>
    },
  },
  {    
    accessorKey: "Company",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company
        <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => { 
      const name = row?.original?.company?.companyName  
      return <div className="">{name}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const req = row.original 
      return (
        <Button variant="outline" className="" size="sm" asChild>
          <Link href={`/dashboard/admin/talents-connect/employers/hiring-requests/${req._id}`}>
            View Req.
          </Link>
        </Button>
      )
    }
}
]
