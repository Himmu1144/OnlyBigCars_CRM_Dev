import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => {


    return (
        <>
            <Header />
            <Container fluid>
                {children}
            </Container>
            <Footer />
        </>
    );
};

export default Layout;