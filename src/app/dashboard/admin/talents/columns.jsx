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
      return  <Badge className={" capitalize"}>{status}</Badge> 
    },
  },
  {
    accessorKey: "name",
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
  },
  {
    
    accessorKey: "category_id",
    header: () => <div className="">Category</div>,
    cell: ({ row }) => {
      const Category = (row.getValue("category_id"))
      return <div className="">{Category}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original
 
      return (
       <Button variant="outline" className="" size="sm" asChild>
        <Link href={`/dashboard/admin/talents/pending-profiles/1`}>
        Profile
        </Link>
        </Button>
      )
    }
}
]
