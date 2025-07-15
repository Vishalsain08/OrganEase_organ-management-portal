import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null); // NEW

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    const storedUser = localStorage.getItem('user');

    if (storedToken) setToken(storedToken);
    if (storedUserType) setUserType(storedUserType);
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (token, role, userObj) => {
    setToken(token);
    setUserType(role);
    setUser(userObj);

    localStorage.setItem('token', token);
    localStorage.setItem('userType', role);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const logout = () => {
    setToken(null);
    setUserType(null);
    setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userType,
        user, // Make user available in context
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
