'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Switch } from "@/components/ui/switch"
import { Label } from '@/components/ui/label';

function ProfileActionPanel({ onApprove, onReject, onEdit }) {
  const [status, setStatus] = useState(false);
  return (
    <div className="py-4"> 
          <Card className="border-none shadow-none"> 
            <CardHeader>
                <CardTitle>
                <h2>Permissions</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>  
             <div className='flex flex-col gap-3'>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">
                      Verification
                    </Label>
                    <div>
                      Profile is verified.
                    </div>
                  </div>
                  <div>
                    <Switch
                      checked={status}
                      onCheckedChange={setStatus}
                    />
                  </div> 
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">
                      Profile visibility
                    </Label>
                    <div>
                      Profile is visible to everyone.
                    </div>
                  </div>
                  <div>
                    <Switch
                      checked={status}
                      onCheckedChange={setStatus}
                    />
                  </div> 
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                    <Label className="text-base">
                      Marketing emails
                    </Label>
                    <div>
                      Receive emails about new products, features, and more.
                    </div>
                  </div>
                  <div>
                    <Switch
                      checked={status}
                      onCheckedChange={setStatus}
                    />
                  </div> 
              </div>
             </div>
            </CardContent>
          </Card>
    </div>
  );
}

export default ProfileActionPanel;
