import React from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import Navigation from './Navigation/Navigation.jsx';
import Footer from './Footer/Footer.jsx';

function Layout() {
  const location = useLocation();
  const hideNavAndFooter = [

    '/SignUp',
    '/SignIn',
    '/Forgot',
    '/Reset',
    '/Verify'
  ];

  const shouldHide = hideNavAndFooter.includes(location.pathname);

  return (
    <>
      {!shouldHide && <Navigation />}
      <Outlet />
      {!shouldHide && <Footer />}
    </>
  );
}

export default Layout;
  