import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { getLocalStorage } from '../utils/LocalStorage';

interface AuthContextType {
  user: string | null;
  login: (username: string) => void;
  logout: () => void;
}


export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);

  const login = (username: string) => {
    setUser(username);
  };

  const logout = () => {
    setUser(null);
  };
  const [userData, setUserData]=useState(null)
  
  useEffect(()=>{
    const {employees, admin} = getLocalStorage()
  setUserData({employees, admin})
  },[])
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;