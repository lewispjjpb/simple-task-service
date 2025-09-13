'use client';
// types/user.ts
export interface IUserIdentifier {
  userId: string;
}

// context/UserContext.tsx
import { createContext, useEffect, useState, ReactNode } from 'react';

export const UserContext = createContext<IUserIdentifier>({} as IUserIdentifier);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    // Check if user already has an ID
    const existingUserId = localStorage.getItem('userId');
console.debug({existingUserId});
    if (existingUserId) {
      setUserId(existingUserId);
    } else {
      // Generate new ID for first-time users
      const newUserId = crypto.randomUUID();
      localStorage.setItem('userId', newUserId);
      console.debug('New user ID generated: ', newUserId);
      setUserId(newUserId);
    }
  }, []);

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};