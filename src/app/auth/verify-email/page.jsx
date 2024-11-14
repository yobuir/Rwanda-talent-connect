'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import axiosInstance from '@/lib/axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

function Page() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const user = session?.user || null;
    const [loading, setLoading] = React.useState(false);
    useEffect(() => {
        if (status === 'unauthenticated' && status !== 'loading') {
            router.push('/auth/login');
        }  
        if(session?.user?.status == 'active') {
            router.push('/dashboard');
        }
    }, [status, user, router, session?.user?.status ]);

    const  resendVerificationEmail = async () => {
        setLoading(true);
        try { 
            const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/resend-verification`,{email: session.user.email});
                if (response.status === 200) {
                    toast({
                                variant: 'default',
                                title: 'Email Sent',
                                description: 'A new verification email has been sent to your inbox.',
                            }); 
                }else{
                    toast({
                                variant: 'destructive',
                                title: 'Error',
                                description: 'An error occurred while sending the verification email.',
                            });
                } 
        
        } catch (err) {  
            toast({
                variant: 'destructive',
                title: 'Error',
                description: err?.response?.data?.message || 'An error occurred while sending the verification email.',
                });
        }finally{
            setLoading(false);
        }
        }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Email Verification Required</h1>
        <p className="mt-4 text-center">
            Please verify your email to access this page. Check your inbox for a verification link.
        </p>
     
         <Button  onClick={resendVerificationEmail} className="w-full mt-4" disabled={loading}>
          {loading ? "Sending..." : " Resend Verification Email"}
        </Button>
    </div>
  );
}

export default Page;
