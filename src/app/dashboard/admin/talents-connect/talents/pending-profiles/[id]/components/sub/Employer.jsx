'use client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React, { useState } from 'react';

function Employer() {
      const [status, setStatus] = useState("Pending");
  return (
    <Card className="">
        <CardHeader>
          <CardTitle className="flex flex-col gap-4 justify-between">
            <h2 className=" font-semibold">Employer Profile</h2>
            <hr/>
          </CardTitle>
        </CardHeader>
      <CardContent> 
          <div className=" text-sm flex flex-col gap-2 ">
            <p><strong>Company:</strong> ABC Tech Solutions</p>
            <p><strong>Location:</strong> San Francisco, CA</p>
            <p><strong>Position:</strong> Frontend Developer</p>
            <div> 
              <Badge>Badge</Badge>
            </div>
          </div>
      </CardContent>
        </Card>
  );
}

export default Employer;
