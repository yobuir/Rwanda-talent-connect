import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isEmailVerified: false,
  hasRole: false,

  login: (userData, token) => {
    const isVerified = userData?.status === 'active';
    const has_role = userData?.role !== null ;
    set({ user: userData, token, isEmailVerified: isVerified, hasRole:has_role });
  },

  logout: () => set({ user: null, token: null, isEmailVerified: false }),
  
  updateEmailVerification: () => set((state) => ({ ...state, isEmailVerified: true })),

}));

export default useAuthStore;
