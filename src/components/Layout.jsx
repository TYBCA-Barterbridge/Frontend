import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx';
import Footer from './Footer/Footer.jsx';
import ChatIcon from './ChatIcon.jsx';
import useAuth from '../hooks/useAuth.jsx';
import AdminDashboard from './AdminDashboard/AdminDashboard.jsx';



function Layout() {
  const {isAdmin} = useAuth()
  const navigate = useNavigate()
  return (
    <>
      {isAdmin ? (
        navigate("/admin")
      ):(
        <>
        <Navigation />
        <Outlet />
        
        <ChatIcon />
        <Footer />
        </>
      )
    }
    </>
  );
}

export default Layout;
  