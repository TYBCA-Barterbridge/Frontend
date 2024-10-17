import React, { useContext } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './pages/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Listings from './pages/Listings';
import Trade from './pages/Trade';
import Profile from './pages/Profile';

function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  // While loading, show a simple loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Header /> {/* Header always visible */}
      <Routes>
        {/* Public Routes (accessible without logging in) */}
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/home" />} />

        {/* Default route to Home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Accessible routes without login */}
        <Route path="/listings" element={<Listings />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

        {/* Redirect to home if route not found */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Footer /> {/* Footer always visible */}
    </BrowserRouter>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
