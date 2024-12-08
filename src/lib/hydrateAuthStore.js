'use client';

import Cookies from 'js-cookie';
import useAuthStore from '@/store/authStore';

const hydrateAuthStore = () => {
  const { login } = useAuthStore.getState();

  const token = Cookies.get('auth_token');
  const user = Cookies.get('user_data') ? JSON.parse(Cookies.get('user_data')) : null;

  if (token && user) {
    login(user, token); // Hydrate Zustand store with cookie data
  }
};

export default hydrateAuthStore;
