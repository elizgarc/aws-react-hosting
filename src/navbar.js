import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function NavBootstrap() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  const hash = location.pathname;

  const navToggle = () => setIsOpen(!isOpen);
  const linkToggle = () => { if (isOpen) setIsOpen(!isOpen); }

  const bgColor = 'rgb(95, 23, 30)';
  
  const txtColor = 'rgb(249, 246, 232)';


  return (
    <Navbar variant="dark" expand="md" style={{paddingTop: 0}}>
      <Container fluid className='px-md-0 pt-md-2' style={{backgroundColor: 'blue'}}>
        <Navbar.Brand as={Link} to="/" className="d-md-none ms-sm-5" style={{color: txtColor}}>Bad Bank</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={navToggle} className="m-1 me-sm-5" style={{color: txtColor, borderColor: txtColor}} />
        <Navbar.Collapse id="basic-navbar-nav" in={isOpen}>
          <Nav variant="tabs" defaultActiveKey={hash} className="container text-center">
              <Nav.Link as={Link} to="/"                onClick={linkToggle} eventKey="/"
              className="px-3">Bad Bank</Nav.Link>
              <Nav.Link as={Link} to="/createaccount/"  onClick={linkToggle} eventKey="/createaccount/"
              className="px-3">Create Account</Nav.Link>
              <Nav.Link as={Link} to="/login/"          onClick={linkToggle} eventKey="/login/"
              className="px-3">Login</Nav.Link>
              <Nav.Link as={Link} to="/deposit/"        onClick={linkToggle} eventKey="/deposit/"
              className="px-3">Deposit</Nav.Link>
              <Nav.Link as={Link} to="/withdraw/"       onClick={linkToggle} eventKey="/withdraw/"
              className="px-3">Withdraw</Nav.Link>
              <Nav.Link as={Link} to="/alldata/"        onClick={linkToggle} eventKey="/alldata/"
              className="px-3">All Data</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
