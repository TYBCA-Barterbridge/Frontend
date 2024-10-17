import React, { useContext } from 'react';
import { Navbar, Nav, NavItem, NavLink, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AuthContext } from '../pages/AuthContext';

const Header = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext); // Access the AuthContext

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/home" style={{ textAlign: 'center' }}>BarterBridge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavItem>
                <NavLink as={Link} to="/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to="/listings">Listings</NavLink>
              </NavItem>
              <NavItem>
                <NavLink as={Link} to="/trade">Trade</NavLink>
              </NavItem>
            </Nav>
            
            <Nav className="ms-auto">
              {/* Check if the user is logged in */}
              {isLoggedIn ? (
                <>
                  {/* Show Logout button if logged in */}
                  <Button variant="danger" onClick={handleLogout} className="ms-2">Logout</Button>
                </>
              ) : (
                <>
                  {/* Show Login and Register buttons if not logged in */}
                  <NavItem>
                    <NavLink as={Link} to="/login">
                      <Button variant="outline-light" className="ms-2">Login</Button>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to="/register">
                      <Button variant="outline-light" className="ms-2">Register</Button>
                    </NavLink>
                  </NavItem>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
