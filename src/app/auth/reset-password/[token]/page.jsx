'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

function Page({ params }) {
const router = useRouter();
  const { toast } = useToast();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

    useEffect(() => { 
        async function fetchParams() {
        const resolvedParams = await params;  
            setToken(resolvedParams.token);  
            }

        fetchParams();
    }, [params]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Validation Error',
        description: 'Please fill in all fields.',
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Password Mismatch',
        description: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axiosInstance.put(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password/${token}`,
        { newPassword:password }
      );

      if (response.data.status === 'success') {
        toast({
          variant: 'default',
          title: 'Password Reset Successful',
          description: 'You can now log in with your new password.',
        });

        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      } else {
        toast({
          variant: 'destructive',
          title: 'Reset Failed',
          description: response.data.message,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.message || error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
       <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-extrabold ">Reset <span className='text-orange-600'>Password</span></h2>
            <div>
                <hr/>
            </div>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              placeholder="Enter new password"
               value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              placeholder="Confirm new password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div> 
  );
}

export default Page;
