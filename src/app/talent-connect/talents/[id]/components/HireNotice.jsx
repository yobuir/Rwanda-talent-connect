import { CustomDialog } from '@/app/components/talentConnect/CustomDialog';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

import { Steps } from 'antd';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { HIRING_STEPS } from '@/lib/Constants';

import { RequestTalent } from '@/utils/talentConnect/client/requestTalents/requestTalent';
import { getAllCompaniesByOwner } from '@/utils/talentConnect/client/getAll';
import { getUser } from '@/utils/talentConnect/users/getUser';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';


function HireNotice({ talent }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);

     const [user, setUser] = useState(null); 
    
      useEffect(() => {
        setLoading(true);
        getUser()
          .then((data) => {
            setUser(data);
          })
          .finally(() => setLoading(false));
      }, []);

    useEffect(() => { 
        const fetchCompanies = async () => {
            const result = await getAllCompaniesByOwner(user?._id); 
            if (result) {
                const activeCompanies = result.filter(company => company.status === 'active');
                setCompanies(activeCompanies);
                if (activeCompanies.length === 1) {
                    setSelectedCompany(activeCompanies[0]._id);
                }
            }
        };
        fetchCompanies();
    }, [user?._id]);

    const trigger = (<Button size="sm" className="flex gap-2 items-center flex-col" title="edit profile">
                        <span className="flex gap-2 items-center">Hire {talent.fullName}</span>
                    </Button>
                    );

    const handleConfirm = async () => {
        if (!selectedCompany) { 
            toast({
                variant: "destructive",
                title: "Please select a company", 
                description: "Please select a company",
            });
            return;
        }
        try {
            setLoading(true);
            setCurrentStep(1);
            const updateData = {};
            if (talent._id) updateData.talentId = talent._id;
            if (selectedCompany) updateData.companyId = selectedCompany;

            const result = await RequestTalent(updateData);
        
            if (result.success) {
                setCurrentStep(2); 
                toast({
                    variant: "success",
                    title: "Request Sent" ,
                    description:"Request sent successfully",
                }); 
            } else { 
                toast({
                    variant: "destructive",
                    title: "Request Failed" ,
                    description: result?.error?.message || "An unexpected error occurred. Please try again later.",
                });
                setCurrentStep(1);
            }
        } catch (error) { 
            toast({
                variant: "destructive",
                title: "Request Failed" ,
                description: error?.error?.message || "An unexpected error occurred. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };

    const content = (
        <div className="grid gap-4">
            <Steps
                size="small"
                current={currentStep}
                items={HIRING_STEPS}
            />
            <div className='mt-4 flex flex-col gap-3'>
                <Label>
                    Choose a company to hire {talent.fullName}
                </Label>
                <Select
                    placeholder="Select a company"
                    onChange={value => setSelectedCompany(value)}
                    options={companies.map(company => ({ label: company.companyName, value: company._id }))}
                    className="mt-4"
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Choose company" />
                    </SelectTrigger>
                    <SelectContent>
                        {companies.map(company => (
                            <SelectItem key={company._id} value={company._id}>
                                {company.companyName}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className='mt-4'>
                <Button onClick={handleConfirm} disabled={selectedCompany===null || loading}>
                    {loading ? "Sending..." : "Confirm & send"}
                </Button>
            </div>
        </div>
    );
    return ( 
        <CustomDialog trigger={trigger} content={content} title={`Hire ${talent.fullName} to work with you.`} description="Hiring process will start here once you click confirm" />
    );
}

export default HireNotice;
