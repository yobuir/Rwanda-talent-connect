
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ForgotPassword } from '@/utils/auth/auth';
import { toast } from '@/hooks/use-toast';

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(''); 
    const [error, setError] = useState(null); 
    const [isSent, setIsSent] = useState(false);

   const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
            const response = await ForgotPassword(email);
            console.log(response.success);
            if (response.success) {
                
                toast({
                    variant: 'default',
                    title: 'Email Verified',
                    description: 'Password reset email link sent successfully!',
                }); 
                setIsSent(true);
            } else {   
                toast({
                    variant: 'destructive',
                    title: 'Verification Failed',
                    description: response?.error?.message || 'An error occurred while resetting your password.',
                    });
            }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  }; 
    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-extrabold ">Reset <span className='text-orange-600'>Password</span></h2>
            <p> Reset your password </p>
            <div>
                <hr/>
            </div>
                {error && <p className="text-red-500 ">{error}</p>}
                {
                    isSent ? (
                        <p className="text-green-500">Password reset email sent successfully!</p>
                    ) : (
                        <>
                        <form onSubmit={handleReset} className="space-y-4">
                            <div> 
                                <Label htmlFor="email"> Enter your Email address</Label>
                                <Input  
                                    id="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}/>

                            </div>   
                            <div>
                                <Link href="/auth/login" className='text-orange-600 underline hover:text-orange-800'>
                                Remember your password ?
                                </Link>
                            </div> 
                                <Button  type="submit" className="w-full mt-4" disabled={loading}>
                                    {loading ? "Sending..." : "Reset Password"}
                                </Button>
                        </form>
                        </>
                    )
                }
            
            </div> 
    );
}
