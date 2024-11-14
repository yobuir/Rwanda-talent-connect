
'use client';
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() { 
    const [newPassword, setNewPassword] = useState('');
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
            <h2 className="text-2xl font-extrabold ">Update <span className='text-orange-600'>Password</span></h2>
            <div>
                <hr/>
            </div>
                {error && <p className="text-red-500 ">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                    <div> 
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input  
                            id="newPassword"
                            type="text"
                            value={newPassword}
                            onChange={(e) => setEmail(e.target.value)}/>

                    </div> 
                    <div>
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input  
                            id="password"
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}/>
                            
                    </div>
                    <Button
                        type="submit"  className="w-full" >
                        Update
                    </Button>
                </form>
            </div> 
    );
}
