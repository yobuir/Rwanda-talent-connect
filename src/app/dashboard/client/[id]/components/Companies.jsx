'use client';

import { CustomDialog } from '@/app/components/talentConnect/CustomDialog';
import CustomFileUpload from '@/app/components/fileUploads/CustomFileUpload';
import CompanyProfile from '@/app/dashboard/components/CompanyProfile';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { getAllCompaniesByOwner } from '@/utils/talentConnect/client/getAll';
import { NewCompany } from '@/utils/talentConnect/client/NewCompany';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

function Companies({ user }) {
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [logo, setLogo] = useState('');
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);     
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const router = useRouter();

    const submitAllChanges = async () => {
        setLoading(true);

        try {
            const updateData = {
                companyName,
                address,
                activityDescription,
                logo,
                owner: user.id,
            };

            const response = await NewCompany(updateData);

            if (response.success) {
                toast({
                    variant: 'default',
                    title: 'Company Created Successfully',
                    description: 'Your company has been created successfully.',
                });
                setCompanyName('');
                setAddress('');
                setActivityDescription('');
                setLogo('');
                fetchCompanies(); // Refresh the company list
            } else {
                toast({
                    variant: 'destructive',
                    title: 'Company Creation Failed',
                    description: response.error?.message || 'An error occurred while creating your company.',
                });
            }
        } catch (error) {
            console.error('Unexpected error:', error);
            toast({
                variant: 'destructive',
                title: 'An unexpected error occurred',
                description: error.message || 'Please try again later.',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchCompanies = async () => {
        try {
            const fetchedCompanies = await getAllCompaniesByOwner(user?._id);
            setCompanies(fetchedCompanies);
        } catch (error) {
            console.error('Error fetching companies:', error);
            toast({
                variant: 'destructive',
                title: 'Error fetching companies',
                description: error.message || 'Unable to fetch companies. Please try again later.',
            });
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, [user]);

   
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCompanies = companies?.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(companies?.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const trigger = (
        <Button variant="outline" size="sm" className="flex gap-2 items-center flex-col" title="Edit Profile">
            <div className="flex gap-1 items-center justify-center">
                <CirclePlus size={16} />
                <span className="hidden lg:block">Add Organization</span>
            </div>
        </Button>
    );

    const content = (
        <div className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-5">
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="company_name" className="text-left">
                            Company Name
                        </Label>
                        <Input
                            id="company_name"
                            placeholder="Enter company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="location" className="text-left">
                            Company Location
                        </Label>
                        <Input
                            id="address"
                            placeholder="Enter company location"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="logo" className="text-left">
                            Upload Company Logo
                        </Label>
                        <CustomFileUpload setMedia={setLogo} />
                    </div>
                    <div className="grid grid-cols-1 items-center gap-4">
                        <Label htmlFor="description" className="text-left">
                            Company Description (Optional)
                        </Label>
                        <Textarea
                            id="description"
                            rows={6}
                            placeholder="Write a few sentences about your company"
                            value={activityDescription}
                            onChange={(e) => setActivityDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Button onClick={submitAllChanges} className="w-full" disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Card className="shadow-none border border-dashed border-gray-200">
            <CardContent>
                <div className="flex gap-2 justify-between py-4 pb-0 items-center">
                    <h1 className="font-semibold text-lg">🏢 My Organizations</h1>
                    <CustomDialog
                        trigger={trigger}
                        content={content}
                        title="🏢 Add New Organization"
                        description="Fill out the form to add a new organization."
                    />
                </div>
                <div className="flex gap-2 justify-between text-gray-500 items-center">
                    <h3>Manage your organizations: add, update, or remove them.</h3>
                </div> 
               
                {(companies?.length === 0)? 
                     (
                        <div className="flex flex-col items-center justify-center h-48">
                            <h1 className="text-gray-500 text-lg">No organizations found.</h1>
                        </div>
                    ):
                    (
                    <div className="flex flex-col mt-5 gap-4">
                            {currentCompanies?.map((company, index) => (
                            <CompanyProfile key={index} company={company} />
                        ))}
                    </div>
                    )
                }
                <div className="flex justify-center mt-4 gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    >
                        Previous
                    </Button>
                    <span className="flex items-center px-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    >
                        Next
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default Companies;
