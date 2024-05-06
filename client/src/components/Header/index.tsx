import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Header() {
    return (
        <>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/day">Day</Nav.Link>
                        <Nav.Link href="/week">Week</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default Header;
