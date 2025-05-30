import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [apiBearerToken, setapiBearerToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (username, password) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Username: username, Password: password }),
    });

    const data = await response.json();
    if (data.success) {
      const newUser = { id: data.userID, customerID: data.customerID, userName: data.userName, roles: data.roles };
      setapiBearerToken(data.tokenString);
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true; // Indicate successful login
    }

    throw new Error(data.message);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const userHasRole = (requiredRole) => {
    return user.roles.includes(requiredRole);
  };

  const contextValue = {
    user,
    isAuthenticated,
    apiBearerToken,
    login,
    logout,
    userHasRole
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
