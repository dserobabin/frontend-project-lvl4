import React, { useMemo, useState } from 'react';
import {
  BrowserRouter, Routes, Route, Outlet, Navigate,
} from 'react-router-dom';
import Chat from './Chat.jsx';
import Login from './Login.jsx';
import Error from './Error.jsx';
import routes from '../routes.js';
import AuthContext from '../contexts/index.js';
import useAuth from '../hooks/index.js';

const AuthProvider = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(currentUser ? { username: currentUser.username } : null);
  const logIn = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser({ username: userData.username });
  };

  const getAuthHeader = () => {
    const userData = JSON.parse(localStorage.getItem('user'));

    return userData?.token ? { Authorization: `Bearer ${userData.token}` } : {};
  };

  const memoizedValue = useMemo(() => ({ logIn, user, getAuthHeader }), [user]);
  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = () => {
  const auth = useAuth();
  return auth.user ? <Outlet /> : <Navigate to={routes.login()} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path={routes.chat()} element={<PrivateRoute />}>
            <Route path="" element={<Chat />} />
          </Route>
          <Route path={routes.login()} element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>

);

export default App;
