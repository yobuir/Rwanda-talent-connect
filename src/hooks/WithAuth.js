'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import useAuthStore from '../store/authStore';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
      if (!user) {
        router.push('/login');
      }
    }, [user]);

    if (!user) return null;  

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
