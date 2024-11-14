'use client';
import { Button } from '@/components/ui/button';
import React from 'react';

function page() {

    const  resendVerificationEmail = async () => {
        try { 
            console.log('Resend email functionality goes here');
        } catch (err) {
            console.error(err);
        }
        }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Email Verification Required</h1>
        <p className="mt-4 text-center">
            Please verify your email to access this page. Check your inbox for a verification link.
        </p>
        <Button 
        onClick={resendVerificationEmail}
            className="mt-4"
        >
            Resend Verification Email
        </Button>
    </div>
  );
}

export default page;
