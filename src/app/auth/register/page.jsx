'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Register } from '@/utils/auth/auth';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function Page() {
    const { toast } = useToast();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await Register(name, phone, email, password);
            console.log(result)
            if (!result.success) {
                if (result.error) {
                    
                    toast({
                        variant: "destructive",
                        title: result?.error?.data?.message || "Uh oh! Something went wrong.",
                        description: result?.error?.errors[0]?.msg || "Unknown error occurred.",
                    });
                } else {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "Registration failed",
                    });
                }
            } else {
                toast({
                    variant: "default",
                    title: "Success",
                    description: "Registration successful!",
                });
                router.push('/auth/login');
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again later.");
            toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: err.message || "Unknown error occurred.",
                });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-extrabold">
                Sign <span className="text-orange-600">Up</span>
            </h2>
            <p>Sign up for a new account</p>
            <hr />
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleRegister} className="space-y-4">
                <div>
                    <Label htmlFor="email">What is your Email?</Label>
                    <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="name">What is your Full Name?</Label>
                    <Input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="phone">What is your phone number?</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="password">Write Your Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <Link href="/auth/login" className="text-semibold text-orange-600 underline hover:text-orange-800">
                        Already have an account?
                    </Link>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Signing Up..." : "Sign Up"}
                </Button>
            </form>
        </div>
    );
}
