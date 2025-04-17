import { createContext } from 'react';

interface authContextType {
  signup: (name: string, username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
}


export const authSignupContext = createContext<authContextType | null>(null);
export const authLoginContext = createContext<authContextType | null>(null);
