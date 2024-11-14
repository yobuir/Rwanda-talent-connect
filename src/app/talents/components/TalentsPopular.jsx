import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Tag, VideoIcon, Star, ChevronUp, ChevronDown } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import SkeletonCard from '@/app/components/loading/SkeletonCard';

function TalentsPopular() {
  const [displayCount, setDisplayCount] = useState(3);
  const [loading, setLoading] = useState(true);  // Loading state

  const topTalents = [
    {
      id: '1',
      name: 'John Doe',
      category: 'Movie Actor',
      image: 'https://github.com/shadcn.png',
      projects: 25,
      rating: 4.5,
      rank: 1
    },
    {
      id: '2',
      name: 'Jane Smith',
      category: 'Video Vixen',
      image: 'https://github.com/shadcn.png',
      projects: 18,
      rating: 4.2,
      rank: 2
    },
    {
      id: '3',
      name: 'Mike Johnson',
      category: 'Theatre Actor',
      image: 'https://github.com/shadcn.png',
      projects: 30,
      rating: 4.7,
      rank: 3
    },
    {
      id: '4',
      name: 'Emily Brown',
      category: 'TV Actor',
      image: 'https://github.com/shadcn.png',
      projects: 22,
      rating: 4.3,
      rank: 4
    },
    {
      id: '5',
      name: 'David Wilson',
      category: 'Movie Actor',
      image: 'https://github.com/shadcn.png',
      projects: 27,
      rating: 4.6,
      rank: 5
    },
    {
      id: '6',
      name: 'Sarah Lee',
      category: 'Theatre Actor',
      image: 'https://github.com/shadcn.png',
      projects: 20,
      rating: 4.4,
      rank: 6
    }
  ];

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Movie Actor':
        return <VideoIcon className="w-5 h-5 text-orange-500" />;
      case 'Video Vixen':
        return <Star className="w-5 h-5 text-yellow-500" />;
      case 'Theatre Actor':
        return <Award className="w-5 h-5 text-green-500" />;
      case 'TV Actor':
        return <Tag className="w-5 h-5 text-purple-500" />;
      default:
        return <Tag className="w-5 h-5 text-gray-500" />;
    }
  };

  const toggleDisplayCount = () => {
    setDisplayCount(prevCount => prevCount === 3 ? 6 : 3);
  };

  useEffect(() => {
    // Simulate a loading delay
    setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);
  }, []);

  return (
    <div className="w-[100%] flex flex-col px-4 py-8">
      <div className="flex justify-between lg:items-center gap-4 lg:flex-row flex-col mb-6">
        <div className='flex flex-col gap-3'>
            <div className="flex lg:items-center gap-4 lg:flex-row flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mr-4">
                Top Ranked Talents
            </h2>
            <div className='flex'>
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {topTalents.length} Talents
                </div>
            </div> 
            </div>
            <div className="text-gray-500 text-sm lg:block hidden">
                Check out the most popular talents in the community right now and find the perfect match for your project.
            </div>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          <button 
            onClick={toggleDisplayCount}
            className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
          >
            {displayCount === 3 ? (
              <>
                View All 6 <ChevronDown className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Show Less <ChevronUp className="ml-2 w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          // Skeleton loaders for talents
          Array.from({ length: displayCount }).map((_, index) => (
            <div key={index} className="md:basis-1/2 lg:basis-1/3">
              <SkeletonCard/>
            </div>
          ))
        ) : (
          topTalents.slice(0, displayCount).map((talent) => (
            <div key={talent.id} className="md:basis-1/2 lg:basis-1/3">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center p-6 relative">
                  <div className="absolute top-2 left-2 bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {talent.rank}
                  </div>
                  <Avatar className="w-24 h-24 mb-4 border-4 border-orange-100">
                    <AvatarImage src={talent.image} alt={talent.name} />
                    <AvatarFallback className="bg-orange-100 text-orange-600">
                      {talent.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {talent.name}
                    </h3>
                    <div className="flex items-center justify-center text-sm text-gray-600 mb-2">
                      {getCategoryIcon(talent.category)}
                      <span className="ml-2">{talent.category}</span>
                    </div>
                    
                    <div className="flex justify-center items-center space-x-4 text-sm text-gray-700">
                      <div className="flex items-center">
                        <VideoIcon className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{talent.projects} Projects</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        <span>{talent.rating} Rating</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TalentsPopular;
