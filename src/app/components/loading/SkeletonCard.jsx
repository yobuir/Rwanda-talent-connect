import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { Card, CardContent } from "@/components/ui/card";
function SkeletonCard() {
  return ( 
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col items-center p-6 relative">
        <div className="absolute top-2 left-2   rounded-full w-8 h-8 flex items-center justify-center font-bold">
            <Skeleton width={20} height={20} />
        </div>
        <Skeleton circle width={96} height={96} className="mb-4" />
        <div className="text-center">
            <Skeleton width={120} height={20} className="mb-2" />
            <Skeleton width={80} height={15} className="mb-2" />
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-700">
            <Skeleton width={80} height={15} />
            <Skeleton width={80} height={15} />
            </div>
        </div>
        </CardContent>
    </Card>
    
  );
}

export default SkeletonCard;
