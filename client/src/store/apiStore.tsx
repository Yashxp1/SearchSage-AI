import { createContext, ReactNode, useContext } from 'react';
import { baseURL } from '../utils';
import { useNavigate } from 'react-router-dom';

interface authContextType {
  signup: (name: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<authContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const signup = async (name: string, username: string, password: string) => {
    try {
      const res = await fetch(`${baseURL}/auth/signup`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ name, username, password }),
      });

      if (!res.ok) {
        throw new Error('Signup failed');
      }

      const result = await res.json();
      console.log('signup success: ', result);
      navigate('/login');
    } catch (error) {
      console.log('Error in signup', error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error('Login failed');
      }

      const result = await res.json();
      console.log('login success: ', result);
      navigate('/dashboard');
    } catch (error) {
      console.log('Error in login', error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
