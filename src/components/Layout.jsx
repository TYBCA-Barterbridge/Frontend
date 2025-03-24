import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx';
import Footer from './Footer/Footer.jsx';

function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
  