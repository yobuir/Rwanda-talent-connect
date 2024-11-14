'use client';
import { useToast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios'; 
import { useSession, signIn } from 'next-auth/react'; 
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

function page({ params }) {  
    const router = useRouter();
    const { data: session, status,update: updateSession } = useSession();  
    const user = session?.user || null;
    const { toast } = useToast(); 
    const [token, setToken] = useState(null);
    const [isVerified, setIsVerified] = useState('pending');  

    useEffect(() => { 
        async function fetchParams() {
        const resolvedParams = await params;  
            setToken(resolvedParams.token);  
            }

        fetchParams();
    }, [params]);

    useEffect(() => {
        if (status === 'unauthenticated' && status !== 'loading') {
            router.push('/auth/login');
        }  
    }, [status, user]);

    useEffect(() => {
        if (!token) return; 
        const verifyEmail = async () => {
        try { 
            const response = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email/${token}`);
            if (response.status === 200) {
                await signIn('credentials', {
                    redirect: false,
                    token: response.data.token,  
                });
                setIsVerified('success');
                toast({
                    variant: 'default',
                    title: 'Email Verified',
                    description: 'Your email has been successfully verified!',
                });

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
                if(error.response?.data?.message === "User already verified") {
                    router.push('/auth/login');
                }
            setIsVerified('error');
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
            {isVerified === 'loading' && <p>Verifying your email...</p>}
            {isVerified === 'success' && <p>Your email has been verified successfully!</p>}
            {isVerified === 'error' && (
                <p className="text-red-500">Verification failed. Please try again or contact support.</p>
            )}
        </div>

  )
}

export default page