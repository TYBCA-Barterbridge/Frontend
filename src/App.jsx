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
import './App.css';

const App = () => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  // While loading, show a simple loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="app-container">
      <BrowserRouter>
        <Header /> {/* Header always visible */}
        <div className="content">
          {/* Your main content goes here */}
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
        </div>
        <Footer /> {/* Footer always visible */}
      </BrowserRouter>
    </div>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;