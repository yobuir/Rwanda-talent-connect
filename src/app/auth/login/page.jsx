'use client';

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      }); 
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: result.error || "Invalid credentials.",
        });
      } else {
        toast({
          variant: "default",
          title: "Login Successful",
          description: "Welcome back!",
        });
        router.push('/dashboard');
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
      <h2 className="text-2xl font-extrabold">
        Sign <span className="text-orange-600">In</span>
      </h2>
      <p>Sign in to your account</p>
      <div>
        <hr />
      </div>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <Label htmlFor="email">Enter your Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="flex gap-2 justify-between items-center mb-2">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/auth/forgot-password"
              className="text-semibold text-orange-600 underline hover:text-orange-800"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          Don’t have an account?{' '}
          <Link
            href="/auth/register"
            className="text-semibold text-orange-600 underline hover:text-orange-800"
          >
            Sign Up now
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
