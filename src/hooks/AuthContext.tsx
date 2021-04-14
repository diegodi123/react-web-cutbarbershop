import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthData {
  token: string;
  user: object;
}

interface SignInCreadentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(creadentals: SignInCreadentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthData>(() => {
    const token = localStorage.getItem('@CutbarberShop:token');
    const user = localStorage.getItem('@CutbarberShop:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthData;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('/sessions', { email, password });

    const { token, user } = response.data;
    localStorage.setItem('@CutbarberShop:token', token);
    localStorage.setItem('@CutbarberShop:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@CutbarberShop:token');
    localStorage.removeItem('@CutbarberShop:user');

    setData({} as AuthData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within am AuthProvider');
  }
  return context;
}
