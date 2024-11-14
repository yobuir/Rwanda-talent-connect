'use client';

import React, { Suspense, useState, useEffect } from 'react';
import NavBar from '../components/Header/NavBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronDown, CirclePlus, Expand, Eye } from 'lucide-react';
import CompanyProfile from './components/CompanyProfile';
import { useSession } from 'next-auth/react';
import Skeleton from 'react-loading-skeleton';
import { toast } from '@/hooks/use-toast';
import { getAllCompaniesByOwner } from '@/utils/companies/client/getAll';
import { useRouter } from 'next/navigation';

function Page() {
  const route=useRouter()
  const { data: session, status } = useSession();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const fetchedCompanies = await getAllCompaniesByOwner(session?.user?.id, 2);
      setCompanies(fetchedCompanies || []);
    } catch (error) { 
      toast({
        variant: 'destructive',
        title: 'Error fetching companies',
        description: error.message || 'Unable to fetch companies. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchCompanies();
    }
  }, [session?.user?.id]);

  const currentCompanies = companies?.slice(0, 3);
  if(session?.user?.role ==="talent"){
    route.push(`/talents/${session?.user?.id}`)
  }
  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Skeleton active /></div>;
  }
  return (
    <div className="relative bg-white">
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="lg:px-12 p-2 lg:max-w-7xl w-full lg:mx-auto lg:min-w-[80%] flex flex-col gap-6">

          {/* Welcome Section */}
          <Suspense fallback={<Skeleton height={30} width="100%" count={1} />}>
            <div className="flex gap-2 w-full lg:flex-row flex-col lg:justify-between lg:items-center">
              <h1 className="text-2xl font-semibold">
                <span className="text-orange-500">Welcome to Rwanda.TC</span>, {session?.user?.name}
              </h1>
              <Link href={`/dashboard/client/${session?.user?.id}`} className="flex flex-row gap-2 items-center font-bold underline hover:text-orange-500">
                My profile
              </Link>
            </div>
          </Suspense>

          {/* Talents Section */}
          <Suspense fallback={<Skeleton height={200} width="100%" count={1} />}>
            <div className="flex flex-col">
              <Link href={''} className="flex flex-col gap-2">
                <Card className="flex flex-col gap-2 bg-gray-50 shadow-none border hover:shadow border-dashed border-gray-200 relative">
                  <CardHeader>
                    <CardTitle className="flex flex-row gap-2 justify-between">
                      <h1 className="text-xl font-semibold text-gray-600 flex items-center gap-1">
                        <ChevronDown /> My Talents
                      </h1>
                      <div>
                        <span className="text-orange-500 flex gap-2 items-center">
                          <Expand size={18} />
                          View All
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-row gap-2">
                        <span className="text-orange-500">0</span>
                        Video Vixens
                      </div>
                      <div className="flex flex-row gap-2">
                        <span className="text-orange-500">0</span>
                        Actors/Actresses
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </Suspense>

          {/* Organizations Section */}
          <Suspense fallback={<Skeleton height={200} width="100%" count={2} />}>
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <Card className="flex flex-col gap-2 shadow-none hover:shadow border border-dashed bg-gray-50 border-gray-200 relative cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex flex-row gap-2 justify-between">
                      <h1 className="text-xl font-semibold text-gray-600 flex items-center gap-1">
                        <ChevronDown /> My Organizations ({companies.length})
                      </h1>
                      <Link href={`/dashboard/client/${session?.user?.id}`} className="flex flex-row gap-2 items-center font-bold hover:text-orange-500">
                        <span className="text-orange-500 flex gap-2 items-center">
                          <Expand size={18} />
                          View All
                        </span>
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {loading ? (
                        <Skeleton height={50} width="100%" count={2} />
                      ) : currentCompanies.length > 0 ? (
                        currentCompanies.map((company) => <CompanyProfile key={company._id} company={company} />)
                      ) : (
                        <p className="text-gray-500">No organizations found.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Suspense>

        </div>
      </div>
    </div>
  );
}

export default Page;
