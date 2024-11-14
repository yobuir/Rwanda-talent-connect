"use client";
import React, { useState, useEffect } from 'react';
import NavBar from '../components/Header/NavBar';
import TalentsPopular from './components/TalentsPopular';
import TalentCard from './components/TalentCard';
import { Star } from 'lucide-react';
import Filtering from './components/Filtering';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { fetchPublishedTalents } from '@/utils/users/talents/getAll';

function Page() {
  // State for the talents data, loading status, and selected filter
  const [talents, setTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  
  useEffect(() => {
    async function loadTalents() {
      setLoading(true);
      try {
        const data = await fetchPublishedTalents();
        setTalents(data?.data || []); 
        setFilteredTalents(data?.data || []); 
      } catch (error) {
        console.error('Error fetching talents:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadTalents();
  }, [activeFilter]); 
  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className='relative bg-white'>
      <NavBar />
      <div className='flex flex-col lg:flex-row gap-3'>
        <div className="min-h-screen px-12 mx-auto lg:w-[80%]">
          <div className="flex flex-col gap-4 max-w-[100%] mx-auto mb-10">
            <div className='flex lg:justify-between lg:flex-row flex-col gap-6 lg:items-center'>
              <div className='flex flex-col'>
                <div className='flex'>
                  <div className="bg-orange-500/20 px-4 flex items-center gap-1 py-2 text-orange-500 rounded-full mb-4">
                    <Star className="h-4 w-4" />
                    Top Ranked Talents
                  </div>
                </div>
                <div className="text-gray-500 text-sm lg:block hidden">
                  Check out the most popular talents in the community right now and find the perfect match for your project.
                </div>
              </div>
            </div>
            <TalentsPopular />
          </div>

          {/* Filter Buttons */}
          <main className="mb-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {['All', 'Video vixens', 'Movie actors', 'Movie actresses'].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-2 ${activeFilter === filter ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-500'} rounded-full text-sm`}
                  onClick={() => handleFilterClick(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Display Loading or Talent Cards */}
            {loading ? (
              <div className="flex flex-wrap gap-6">
                {/* Skeleton loader for talent cards */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-full md:w-1/3">
                    <Skeleton height={300} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {filteredTalents.length > 0 ? (
                    filteredTalents.map((talent) => (
                      <TalentCard key={talent._id} talent={talent} />
                    ))
                  ) : (
                    <p>No talents found for this filter.</p>
                  )}
                </div>
              </div>
            )}
          </main>
        </div>

        {/* Filtering Sidebar */}
        <div className='order-first lg:order-last'>
          <Filtering 
            talents={talents} 
            setFilteredTalents={setFilteredTalents} 
          />
        </div>
      </div>
    </div>
  );
}

export default Page;
