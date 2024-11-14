"use client";
import React, { useState, useEffect, useCallback } from 'react'; 
import { fetchPublishedTalents } from '@/utils/talentConnect/users/talents/getAll';
import { getCategories } from '@/utils/talentConnect/categories/getAll';
import Skeleton from 'react-loading-skeleton'; 
import NavBar from '@/app/components/Header/NavBar';
import Filtering from './components/Filtering';
import TalentsPopular from './components/TalentsPopular';
import SkeletonCard from '@/app/components/loading/SkeletonCard';
import TalentCard from './components/TalentCard';

function Page() {
  const [talents, setTalents] = useState([]);
  const [filteredTalents, setFilteredTalents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    loadCategories();
  }, []);

  const loadTalents = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchPublishedTalents(page);
      if (data?.data?.length > 0) {
        setTalents(prev => [...prev, ...data.data]); 
        setFilteredTalents(prev => [...prev, ...data.data]);
      } else {
        setHasMore(false);  // No more talents to load
      }
    } catch (error) {
      console.error('Error fetching talents:', error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    // Reset talents state when the component mounts
    setTalents([]);
    setFilteredTalents([]);
    setSuggestions([]);
    setPage(1);
    setHasMore(true);
    setLoading(true);
    loadTalents();
  }, []); 

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    setPage(1);
    setTalents([]); // Reset talents state to avoid duplication
    setFilteredTalents([]);
    setSuggestions([]);
    setLoading(true);
    if (filter === 'All') {
      loadTalents();
    } else {
      const filtered = talents.filter(talent => talent?.talentProfile?.categoryId === filter);
      setFilteredTalents(filtered);
      if (filtered.length === 0) {
        const otherSuggestions = talents.filter(talent => talent?.talentProfile?.categoryId !== filter).slice(0, 4);
        setSuggestions(otherSuggestions);
      } else {
        setSuggestions([]);
      }
      setLoading(false);
    }
  };

  const [filters, setFilters] = useState({
    genders: [],
    age:null,
    skills: [],
    location: '',
    languages: [],
    bodyTypes: [],
    eyeColors: [],
    skinColors: [],
    weights: [],
    heights: [],
    hairColors: [],
    hourlyRateMin: null,
  });

  return (
    <div className="relative bg-white mb-6 " >
      <NavBar />
      <div className="flex flex-col lg:flex-row gap-3 p-4 ">
        <div className="min-h-screen  lg:px-12 mx-auto   w-full lg:w-[80%]">
          <div className="flex flex-col gap-4 max-w-[100%] mx-auto"> 
            <Filtering 
              talents={talents} 
              setFilteredTalents={setFilteredTalents} 
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="flex flex-col gap-4 max-w-[100%] mx-auto ">
            <TalentsPopular />
          </div>
          {/* Filter Buttons */}
          <main className="flex flex-col gap-4 max-w-[100%] mx-auto ">
            <div className="flex flex-wrap gap-4 mb-8">
              {loading ? (
                <div className="flex flex-wrap gap-6">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="w-full md:w-1/5">
                      <Skeleton width={100} height={40} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <button
                    className={`px-4 py-2 capitalize ${activeFilter === 'All' ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-500'} rounded-full text-sm`}
                    onClick={() => handleFilterClick('All')}
                  >
                    All
                  </button>
                  {categories?.map((filter) => (
                    <button
                      key={filter?._id}
                      className={`px-4 py-2 capitalize ${activeFilter === filter?._id ? 'bg-orange-500 text-white' : 'bg-orange-500/20 text-orange-500'} rounded-full text-sm`}
                      onClick={() => handleFilterClick(filter?._id)}
                    >
                      {filter?.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Display Loading or Talent Cards */}
            {loading ? (
              <div className="flex flex-wrap gap-6">
                {/* Skeleton loader for talent cards */}
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="w-full md:w-1/5">
                    <SkeletonCard />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {filteredTalents.length > 0 ? ( 
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {filteredTalents.map((talent, index) => (
                      talent?
                      <TalentCard key={`${talent?._id}-${index}`}  filters={filters}  talent={talent} />
                      :('')
                    ))}
                  </div>
                ) : (
                  <div>
                    <p>No talents found for this filter.</p>
                    <button
                      className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-full"
                      onClick={() => handleFilterClick('All')}
                    >
                      Reset Filter
                    </button>
                    {suggestions.length > 0 && (
                      <div>
                        <h3 className="mt-4 mb-2 text-lg font-semibold">You might also like:</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                          {suggestions.map((talent, index) => (
                            talent?
                            <TalentCard key={`${talent?._id}-${index}`} talent={talent} /> :('')
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default Page;
