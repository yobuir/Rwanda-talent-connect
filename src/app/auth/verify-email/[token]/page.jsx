'use client';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import useAuthStore from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const { isEmailVerified,updateEmailVerification } = useAuthStore();

    const router = useRouter();
    const { toast } = useToast();
    const [status, setStatus] = useState('loading');
    const [token, setToken] = useState(null);

    useEffect(() => { 
        async function fetchParams() {
        const resolvedParams = await params;  
            setToken(resolvedParams.token);  
            }

        fetchParams();
    }, [params]);

    useEffect(() => {
    if (isEmailVerified) {
        router.push('/dashboard');
    }
    }, [isEmailVerified, router]);


    useEffect(() => {
        if (!token) return; 
        const verifyEmail = async () => {
        try { 
            const response = await axiosInstance.get(`auth/verify-email/${token}`);

            if (response.data.success) {
                setStatus('success');
                toast({
                    variant: 'default',
                    title: 'Email Verified',
                    description: 'Your email has been successfully verified!',
                });

            updateEmailVerification();
            setTimeout(() => {
                router.push('/auth/login');
                }, 3000);
            } else {  
                
                toast({
                    variant: 'destructive',
                    title: 'Verification Failed',
                    description: response.data.message,
                    });
            }
            } catch (error) {  
            setStatus('error');
            toast({
                variant: 'destructive',
                title: 'Verification Failed',
                description: error.response?.data?.message || error.message,
                });
        }
    };

    verifyEmail();
  }, [token, router, toast]);

  
  return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            {status === 'loading' && <p>Verifying your email...</p>}
            {status === 'success' && <p>Your email has been verified successfully!</p>}
            {status === 'error' && (
                <p className="text-red-500">Verification failed. Please try again or contact support.</p>
            )}
        </div>

  )
}

export default page