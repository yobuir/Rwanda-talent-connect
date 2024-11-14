import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Tag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getCategoryById } from '@/utils/categories/getCategory';
import { calc } from 'antd/es/theme/internal';

function TalentCard({ talent, filters }) {
  
    const [categoryName, setCategoryName] = useState('');
    const [matchPercentage, setMatchPercentage] = useState(0);

    useEffect(() => {
        if (talent?.talentProfile?.categoryId) {
            getCategoryById(talent?.talentProfile?.categoryId).then((data) => {
                setCategoryName(data?.category?.name);
            });
        }
    }, [talent?.talentProfile?.categoryId]);

    const calculateMatchPercentage = () => {
        let matchScore = 0;
        let totalPossibleScore = 0;

        // Gender match
        if (filters?.genders?.length > 0) {
            totalPossibleScore += 15;
            if (filters?.genders?.includes(talent?.gender)) {
                matchScore += 15;
            }
        }

        // Skills match
        if (filters?.skills?.length > 0) {
            totalPossibleScore += 25;
            const skillMatches = filters?.skills?.filter(skill => 
                talent?.skills?.includes(skill)
            ).length;
            matchScore += (skillMatches / filters?.skills?.length) * 25;
        }

        // Languages match
        if (filters?.languages?.length > 0) {
            totalPossibleScore += 15;
            const languageMatches = filters?.languages?.filter(lang => 
                talent.languages?.includes(lang)
            ).length;
            matchScore += (languageMatches / filters?.languages?.length) * 15;
        }

        // Location match (partial match)
        if (filters?.location) {
            totalPossibleScore += 10;
            if (talent?.address?.toLowerCase()?.includes(filters?.location?.toLowerCase())) {
                matchScore += 10;
            }
        }

        // Hourly rate match
        if (filters?.hourlyRateMin !== null || filters?.hourlyRateMax !== null) {
            totalPossibleScore += 15;
            const talentRate = talent?.hourlyRate || 0;
            if (
                (filters?.hourlyRateMin === null || talentRate >= filters?.hourlyRateMin) &&
                (filters?.hourlyRateMax === null || talentRate <= filters?.hourlyRateMax)
            ) {
                matchScore += 15;
            }
        }

        // Prevent division by zero and calculate percentage
        const percentage = totalPossibleScore > 0 
            ? Math.round((matchScore / totalPossibleScore) * 100) 
            : 100;

        return Math.max(70, Math.min(percentage, 100));
    };

    // Calculate match percentage when filters change
    useEffect(() => {
        setMatchPercentage(calculateMatchPercentage());
    }, [filters, talent,calculateMatchPercentage]);

    return (
      <> 
      <Card className="shadow-sm border-gray-200 hover:shadow-xl transition-all duration-300 group">
      <div className="relative"> 
        <span className='absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1'>
          <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
          <div  className={`
                            font-bold 
                            ${matchPercentage >= 90 ? 'text-green-600' : 
                              matchPercentage >= 80 ? 'text-green-500' : 
                              matchPercentage >= 70 ? 'text-yellow-600' : 'text-red-500'}
                        `}
                    >
                        {matchPercentage}%
                    </div>
        </span>
      </div>
        <CardContent className="flex flex-col items-center p-6 pt-8">
            <Link 
          href={`/talents/${talent?._id}`}
          className='relative mb-4 flex justify-center items-center'
        >    
        <Avatar className="w-40 h-40 border-4 border-orange-500/20 group-hover:border-orange-500 transition-all">
            <AvatarImage 
              src={talent.profileImage || "https://github.com/shadcn.png"} 
              alt={talent.fullName}
              className="object-cover"
            />
            <AvatarFallback>{talent.fullName?.charAt(0) || 'T'}</AvatarFallback>
          </Avatar>
            <span className='absolute capitalize bottom-0 right-0 bg-orange-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1'>
              <Tag size={14} /> {categoryName || 'Talent'}
            </span>
            </Link> 
            <Link href={`/talents/${talent?._id}`} className='flex flex-col justify-between items-center'>
                <h3 className="text-lg font-semibold text-center">{talent?.fullName}</h3>
                {talent?.talentProfile?.headline && (
                        <div className="flex items-center text-sm text-gray-700">
                            <Tag className="mr-2 h-4 w-4 text-gray-500" />
                            {talent.talentProfile.headline}
                        </div>
                    )}
                {talent?.address && (
                        <div className="flex items-center text-sm text-gray-700">
                            <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                            {talent.address}
                        </div>
                    )}
            </Link>        
        </CardContent>
    </Card> 
        </>
    );
}

export default TalentCard;