import React, { useState, useCallback, useEffect } from 'react';
import CustomFileUpload from '@/app/components/fileUploads/CustomFileUpload';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { updateCompany } from '@/utils/talentConnect/client/updateCompany';
import { toast } from '@/hooks/use-toast'; 
import { useRouter } from 'next/navigation';

function CompanyUpdate({ company }) {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitAllChanges = useCallback(async () => {
    if (!companyName || !address) {
      toast({
        variant: 'destructive',
        title: 'Missing Required Fields',
        description: 'Please fill in all required fields before submitting.',
      });
      return;
    }

    setLoading(true);
    const updateData = {
      ...(companyName && { companyName }),
      ...(address && { address }),
      ...(activityDescription && { activityDescription }),
      ...(logo && { logo }),
    };

    try {
      const response = await updateCompany(updateData, company?._id);
      if (response.success) {
        toast({
          variant: 'default',
          title: 'Company Updated Successfully',
          description: 'Your company has been updated successfully.',
        });
        router.push('/companies'); // Navigate to a different page after success
      } else {
        toast({
          variant: 'destructive',
          title: 'Company Update Failed',
          description: 'An error occurred while updating your company. Please try again.',
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        variant: 'destructive',
        title: 'Unexpected Error',
        description: error.message || 'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  }, [companyName, address, activityDescription, logo, router]);

  // useEffect(() => {
  //   if (company) {
  //     setCompanyName(company.companyName || '');
  //     setAddress(company.address || '');
  //     setActivityDescription(company.activityDescription || '');
  //     setLogo(company.logo || '');
  //   }
  // }, [company]);

    useEffect(() => {
    if (company) {
      setCompanyName(company.companyName || '');
      setAddress(company.address || '');
      setActivityDescription(company.activityDescription || '');
      setLogo(company.logo || '');
    }
  }, []);

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-5">
      {/* Company Name */}
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="company_name" className="text-left">
          What is your company name
        </Label>
        <Input
          id="company_name"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Company Address */}
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="address" className="text-left">
          What is your company location
        </Label>
        <Input
          id="address"
          placeholder="Enter company location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          disabled={loading}
        />
      </div>

      {/* Company Description */}
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="activityDescription" className="text-left">
          What is your company description (optional)
        </Label>
        <Textarea
          id="activityDescription"
          rows={6}
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
          placeholder="Write a few sentences about your company"
          disabled={loading}
        />
      </div>

      {/* Company Logo */}
      <div className="grid grid-cols-1 items-center gap-4">
        <Label htmlFor="logo" className="text-left">
          Upload company logo
        </Label>
        <CustomFileUpload setMedia={setLogo} />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-4">
        <Button onClick={submitAllChanges} className="w-full" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default CompanyUpdate;
