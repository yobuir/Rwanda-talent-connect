import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { newCategories } from '@/utils/admin/categories/newCategory';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

function CategoryNew({ onCategoryAdded = () => {} }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
        const data = {}
        if(name) data.name = name;
        if(description) data.description = description;
        const result = await newCategories(data);

        if(result?.status === 'error'){
          toast({
            variant: 'destructive',
            title: 'Error creating category',
            description: result?.message || 'An error occurred while creating category.',
            });
        }

        if(result?.status =='success'){
          toast({
            variant: 'default',
            title: 'Success',
            description: "Category added successfully",
            });
          setName('');
          setDescription('');
          onCategoryAdded();
          }

        } catch (error) { 
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error?.error?.message || 'An error occurred while resetting your password.',
                });
        }finally{
            setLoading(false);
        }
  
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">New category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new category</DialogTitle>
          <DialogDescription>
            Add a new category to manage your content.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Description
              </Label>
              <Textarea
                id="name"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>{loading ? 'Saving ...' : 'Save changes'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CategoryNew;
