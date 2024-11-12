import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link' 
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs" 
import ProfileActivityLog from './components/ProfileActivityLog';
import ProfileHiringRequests from './components/ProfileHiringRequests';
import ProfileMedia from './components/ProfileMedia'; 
import ProfileInfoCard from './components/ProfileInfoCard';
import ProfileActionPanel from './components/ProfileActionPanel';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
function page() {

    const user = {
        name: "username",
        email: 'user@example.com',
        role: 'Admin',
        status: 'Pending',
    };

    const activities = [
        { description: 'Logged in', timestamp: '2023-11-10 10:00 AM' },
        { description: 'Viewed dashboard', timestamp: '2023-11-10 10:05 AM' },
    ];

    const handleApprove = () => alert('Approved');
    const handleReject = () => alert('Rejected');
    const handleEdit = () => alert('Editing');


  return (
    <div className='flex flex-col gap-3'>
             <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <Link href="/dashboard/admin">
                    Dashboard
                    </Link>
                </BreadcrumbItem>
                   <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem className="hidden md:block">
                        <Link href="/dashboard/admin/talents">
                        Talents
                        </Link>
                    </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                    <Link href="/dashboard/admin/talents/pending-profiles">
                    Pending Talents
                    </Link>
                </BreadcrumbItem> 
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                    <BreadcrumbPage>[user name]</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className='flex flex-col  gap-4  w-full'>
                <div className='flex-1'>
                    <Card>
                        <CardHeader>
                            <CardTitle>
                            <h2 >Profile Information</h2>
                            </CardTitle>
                        </CardHeader>
                        <CardContent> 
                            <ProfileInfoCard user={user} />
                    </CardContent>
                    </Card>
                </div>
                <Tabs defaultValue="hiring" className="w-full">
                    <TabsList>
                        <TabsTrigger value="profile">Profile Status</TabsTrigger>
                        <TabsTrigger value="media">Profile media</TabsTrigger>
                        <TabsTrigger value="hiring">Hiring requests</TabsTrigger>
                        <TabsTrigger value="activity">Activity logs</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <Card>
                            <CardContent> 
                                <ProfileActionPanel />
                            </CardContent>
                        </Card>    
                    </TabsContent>
                    <TabsContent value="media">
                        <Card>
                            <CardContent>
                                <ProfileMedia/>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="hiring">  
                        <ProfileHiringRequests/> 
                    </TabsContent>
                    <TabsContent value="activity">
                        <Card>
                            <CardContent>
                                <ProfileActivityLog activities={activities} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

        </div>
    </div>
  )
}

export default page