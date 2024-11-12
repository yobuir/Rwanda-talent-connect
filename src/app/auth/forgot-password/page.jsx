
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
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
            <h2 className="text-2xl font-extrabold ">Reset <span className='text-orange-600'>Password</span></h2>
            <p> Reset your password </p>
            <div>
                <hr/>
            </div>
                {error && <p className="text-red-500 ">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
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
                    <Button
                        type="submit"  className="w-full" >
                        Reset
                    </Button>
                </form>
            </div> 
    );
}
