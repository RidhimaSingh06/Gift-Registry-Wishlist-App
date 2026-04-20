import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('registry_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const loginAuth = (userData) => {
    localStorage.setItem('registry_user', JSON.stringify(userData));
    setUser(userData);
  };

  const logoutAuth = () => {
    localStorage.removeItem('registry_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginAuth, logoutAuth, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
