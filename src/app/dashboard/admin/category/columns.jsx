"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { deleteCategory } from '@/utils/admin/categories/deleteCategory';
import { useState } from 'react';

import { ArrowUpDown } from "lucide-react" 
import { toast } from "@/hooks/use-toast";

const ActionCell = ({ row, loadCategories }) => {
  const category = row.original;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteCategory(category._id);
      if (result?.status === 'success') {
        toast({
          variant: 'default',
          title: 'Success',
          description: "Category deleted successfully",
        });
        loadCategories();
      } else {
        toast({
          variant: 'destructive',
          title: 'Error deleting category',
          description: result?.message || 'An error occurred while deleting category.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.error?.message || 'An error occurred while resetting your password.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Button variant="destructive" className="w-full" onClick={handleDelete} disabled={loading}>
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Columns = (loadCategories) => [
    {
    accessorKey: "createdAt", 
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const createdAt = new Date(row?.getValue("createdAt")).toLocaleDateString()
      return  createdAt
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
    accessorKey: "Actions",
    id: "actions",
    cell: ({ row }) => <ActionCell row={row} loadCategories={loadCategories} />
  }
]
