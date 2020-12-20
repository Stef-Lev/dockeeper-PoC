import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import AllDocsPage from '../routes/AllDocsPage';

function Navigation() {
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to="/features">Features</Nav.Link>
                    <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navigation
