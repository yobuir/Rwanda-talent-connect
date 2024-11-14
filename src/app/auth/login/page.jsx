
'use client';
import { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label'; 
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Login } from '@/utils/auth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function LoginPage() { 
  const isLoggedIn = useAuthStore.user !== null;    
    useEffect(() => {
        if (isLoggedIn) {
            // router.push('/dashboard');
        }
    }, [isLoggedIn]);
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    try {
        
        
        const result = await Login(email, password);
        
        if (!result.success) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: result?.error?.errors[0]?.message || "Unknown error occurred.",
            });
        } else {
            
            toast({
                variant: "default",
                title: "Success",
                description: "Logged in successful!",
            });
            router.push('/dashboard');
        }

    } catch (error) {
        setError("An unexpected error occurred. Please try again later.");
        toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: error,
            });
    }
    finally{
        setLoading(false);
    }
        };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-extrabold ">Sign <span className='text-orange-600'>In</span></h2>
            <p> Sign up for new account </p>
            <div>
                <hr/>
            </div>
                {error && <p className="text-red-500 ">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div> 
                        <Label htmlFor="email"> Enter your Email or phone ?</Label>
                        <Input  
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                    </div> 
                    <div>
                        <div className='flex gap-2 justify-between items-center mb-2'>   
                        <Label htmlFor="password"> Write Your Password?</Label>
                        <Link href="/auth/forgot-password" className='text-semibold text-orange-600 underline hover:text-orange-800'>Forgot Password?</Link>
                        </div>
                        <Input  
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                        Do not have an account? <Link href="/auth/register" className='  text-semibold text-orange-600 underline hover:text-orange-800'>Sign Up now</Link>
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Loading..." : "Sign In"}
                    </Button>
                </form>
            </div> 
    );
}
