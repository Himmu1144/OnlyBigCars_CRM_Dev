import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown, Form, Button, Dropdown } from 'react-bootstrap';
import { FaUser, FaSearch } from 'react-icons/fa';
import './header.css';

const Header = () => {
    const [status, setStatus] = useState('Login Status'); // Add state

    const handleSelect = (text) => {
        setStatus(text);
    };

    return (
        <Navbar bg="light" variant="light" expand="lg" fixed="top">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    <img
                        src="https://onlybigcars.com/wp-content/uploads/2024/11/OnlyBigCars-Logo.png"
                        width="210"
                        className="d-inline-block align-top"
                        alt="OnlyBigCars"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >  
                    </Nav>

                    <Dropdown className="drop-down-container">
                        <Dropdown.Toggle variant="danger" id="dropdown-basic" className='dropdown-btn'>
                            {status}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelect('Active')}>Active</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect('Action 2')}>Action 2</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelect('Action 3')}>Action 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                   
                    <Button 
                        variant="outline-danger" 
                        className="ms-2 rounded-circle profile-btn"
                        style={{width: '40px', height: '40px', padding: '6px'}}
                    >
                        <FaUser />
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;