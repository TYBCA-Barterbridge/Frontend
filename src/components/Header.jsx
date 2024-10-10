import React, { useContext } from 'react';
import { Navbar, Nav, NavItem, NavLink, Form, Button, Container } from 'react-bootstrap';
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
              {isLoggedIn ? (
                <>
                  <NavItem>
                    <NavLink as={Link} to="/profile">Profile</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to="/listings">Listings</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink as={Link} to="/trade">Trade</NavLink>
                  </NavItem>
                  <NavItem>
                    <Button variant="danger" onClick={handleLogout}>Logout</Button>
                  </NavItem>
                </>
              ) : (
                <NavItem>
                  <NavLink as={Link} to="/login">Login</NavLink>
                </NavItem>
              )}
            </Nav>
            {isLoggedIn && (
              <Form className="d-flex">
                <Form.Control type="text" placeholder="Search" />
                <Button variant="primary" type="button">Search</Button>
              </Form>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
