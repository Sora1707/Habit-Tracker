import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getStyle } from "~/utils";
import styles from "./Header.module.scss";

const cx = getStyle(styles);

function Header() {
    return (
        <div className={cx("")}>
            <Navbar fixed="top" bg="dark" data-bs-theme="dark" z-index={100}>
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/manager">Habits</Nav.Link>
                        <Nav.Link href="/day">Day</Nav.Link>
                        <Nav.Link href="/week">Week</Nav.Link>
                        <Nav.Link href="/create">Create</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
