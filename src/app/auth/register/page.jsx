
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Page() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { login } = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch(`/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();
            login(data.user, data.token);
        } catch (err) {
            setError(err.message);
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
                        <Label htmlFor="email"> What is your Email ?</Label>
                        <Input  
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}/>

                    </div>
                <div> 
                    <Label htmlFor="name"> What is your Full Name?</Label>
                            <Input  
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div> 
                    <Label htmlFor="phone"> What is your phone number ?</Label>
                        <Input  
                            id="phone"
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <div>
                        <Label htmlFor="password"> Write Your Password?</Label>
                        <Input  
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div> 
                      <Link href="/auth/login" className='  text-semibold text-orange-600 underline hover:text-orange-800'>Already have an account?</Link>
                    </div>
                    <Button
                        type="submit" className="w-full"  >
                        Sign Up
                    </Button>
                </form>
            </div> 
    );
}
