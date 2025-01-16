import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  setAuthenticateState: (status: boolean) => void;
}

export const useAuthStateStore = create<AuthState>((set) => {
  return {
    isAuthenticated: false,
    setAuthenticateState: (status) => set({ isAuthenticated: status }),
  };
});
