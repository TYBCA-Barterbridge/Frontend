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
      <Routes>
        {/* Public Routes */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Default route to Home */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* Private Routes (only accessible when logged in) */}
        <Route path="/profile" element={isLoggedIn ? <Layout><Profile /></Layout> : <Navigate to="/login" />} />
        <Route path="/listings" element={isLoggedIn ? <Layout><Listings /></Layout> : <Navigate to="/login" />} />
        <Route path="/trade" element={isLoggedIn ? <Layout><Trade /></Layout> : <Navigate to="/login" />} />

        {/* Redirect to home if route not found */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

// Layout component to wrap Header, Footer, and page content
function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
}

const WrappedApp = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default WrappedApp;
